document.addEventListener("DOMContentLoaded", () => {
    // ======================
    // LOADER
    // ======================

    const loader = document.getElementById("loader");

    if (loader) {
        window.addEventListener("load", () => {
            loader.style.opacity = "0";
            loader.style.transition = "0.6s";

            window.setTimeout(() => {
                loader.style.display = "none";
            }, 600);
        });
    }

    // ======================
    // MOBILE MENU
    // ======================

    const menuBtn = document.getElementById("menu-btn");
    const closeBtn = document.getElementById("close-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    const setMenuOpen = (isOpen) => {
        if (!menuBtn || !mobileMenu) {
            return;
        }

        mobileMenu.style.right = isOpen ? "0" : "-100%";
        mobileMenu.setAttribute("aria-hidden", String(!isOpen));
        menuBtn.setAttribute("aria-expanded", String(isOpen));
    };

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => setMenuOpen(true));
    }

    if (closeBtn && mobileMenu) {
        closeBtn.addEventListener("click", () => setMenuOpen(false));
    }

    if (mobileMenu) {
        mobileMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setMenuOpen(false));
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenuOpen(false);
        }
    });

    // ======================
    // TYPING EFFECT
    // ======================

    const roles = [
        "Full Stack Software Developer",
        "React Developer",
        "Next.js Developer",
        "MERN Stack Developer",
    ];

    const typing = document.getElementById("typing");

    if (typing) {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            typing.textContent = roles[0];
        } else {
            let roleIndex = 0;
            let charIndex = 0;
            let deleting = false;

            const type = () => {
                const current = roles[roleIndex];

                if (!deleting) {
                    typing.textContent = current.substring(0, charIndex + 1);
                    charIndex += 1;

                    if (charIndex >= current.length) {
                        deleting = true;

                        window.setTimeout(type, 1200);
                        return;
                    }
                } else {
                    typing.textContent = current.substring(0, charIndex - 1);
                    charIndex -= 1;

                    if (charIndex <= 0) {
                        deleting = false;
                        roleIndex = (roleIndex + 1) % roles.length;
                    }
                }

                window.setTimeout(type, deleting ? 45 : 90);
            };

            type();
        }
    }

    // ======================
    // SCROLL REVEAL
    // ======================

    const reveals = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -10% 0px",
            }
        );

        reveals.forEach((section) => revealObserver.observe(section));
    } else {
        reveals.forEach((section) => section.classList.add("active"));
    }

    // ======================
    // ACTIVE NAVBAR
    // ======================

    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    const navSections = ["home", "about", "skills", "projects", "contact"]
        .map((id) => document.getElementById(id))
        .filter(Boolean);
    const navLinksByHash = new Map(
        navLinks.map((link) => [link.getAttribute("href"), link])
    );

    const setActiveNav = (sectionId) => {
        navLinks.forEach((link) => link.classList.remove("active"));

        const activeLink = navLinksByHash.get(`#${sectionId}`);

        if (activeLink) {
            activeLink.classList.add("active");
        }
    };

    if (navSections.length > 0) {
        if ("IntersectionObserver" in window) {
            const navObserver = new IntersectionObserver(
                (entries) => {
                    const visibleEntries = entries
                        .filter((entry) => entry.isIntersecting)
                        .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

                    if (visibleEntries.length > 0) {
                        setActiveNav(visibleEntries[0].target.id);
                    }
                },
                {
                    threshold: [0.25, 0.5, 0.75],
                    rootMargin: "-25% 0px -55% 0px",
                }
            );

            navSections.forEach((section) => navObserver.observe(section));
            setActiveNav("home");
        } else {
            const updateActiveNav = () => {
                let current = "home";

                navSections.forEach((section) => {
                    const sectionTop = section.offsetTop - 150;

                    if (window.scrollY >= sectionTop) {
                        current = section.getAttribute("id") || current;
                    }
                });

                setActiveNav(current);
            };

            window.addEventListener("scroll", updateActiveNav, { passive: true });
            updateActiveNav();
        }
    }

    // ======================
    // BACK TO TOP
    // ======================

    const back = document.getElementById("backToTop");

    if (back) {
        const updateBackToTop = () => {
            const visible = window.scrollY > 500;

            back.classList.toggle("opacity-0", !visible);
            back.classList.toggle("invisible", !visible);
            back.classList.toggle("opacity-100", visible);
            back.classList.toggle("visible", visible);
        };

        window.addEventListener("scroll", updateBackToTop, { passive: true });
        updateBackToTop();

        back.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }
});