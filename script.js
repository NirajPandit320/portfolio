document.addEventListener("DOMContentLoaded", () => {
    // ======================
    // MOBILE MENU
    // ======================

    const menuBtn = document.getElementById("menu-btn");
    const closeBtn = document.getElementById("close-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    const setMenuOpen = (isOpen, restoreFocus = false) => {
        if (!menuBtn || !mobileMenu) {
            return;
        }

        if (isOpen) {
            mobileMenu.hidden = false;
            mobileMenu.removeAttribute("inert");
            void mobileMenu.offsetWidth;
            mobileMenu.classList.add("menu-open");
            menuBtn.setAttribute("aria-expanded", "true");
            if (closeBtn) {
                closeBtn.focus();
            }
        } else {
            mobileMenu.classList.remove("menu-open");
            mobileMenu.setAttribute("inert", "");
            menuBtn.setAttribute("aria-expanded", "false");
            window.setTimeout(() => {
                if (!mobileMenu.classList.contains("menu-open")) {
                    mobileMenu.hidden = true;
                }
            }, 300);
            if (restoreFocus) {
                menuBtn.focus();
            }
        }
    };

    if (menuBtn && mobileMenu) {
        mobileMenu.hidden = true;
        mobileMenu.setAttribute("inert", "");
        menuBtn.addEventListener("click", () => setMenuOpen(true));
    }

    if (closeBtn && mobileMenu) {
        closeBtn.addEventListener("click", () => setMenuOpen(false, true));
    }

    if (mobileMenu) {
        mobileMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setMenuOpen(false));
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && mobileMenu && !mobileMenu.hidden) {
            setMenuOpen(false, true);
        }
    });

    // ======================
    // TYPING EFFECT
    // ======================

    const roles = [
        "Full Stack Software Developer",
        "React & TypeScript Developer",
        "ASP.NET Core & Next.js Engineer",
        "GovTech & Enterprise Systems Builder",
    ];

    const typing = document.getElementById("typing");
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (typing && !prefersReducedMotion) {
        let roleIndex = 0;
        let charIndex = roles[0].length;
        let deleting = true;

        const tick = () => {
            const current = roles[roleIndex];

            if (!deleting) {
                charIndex += 1;
                typing.textContent = current.substring(0, charIndex);

                if (charIndex >= current.length) {
                    deleting = true;
                    window.setTimeout(tick, 1800);
                    return;
                }
            } else {
                charIndex -= 1;
                typing.textContent = current.substring(0, charIndex);

                if (charIndex <= 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }

            window.setTimeout(tick, deleting ? 40 : 80);
        };

        window.setTimeout(tick, 2200);
    }

    // ======================
    // ACTIVE NAVBAR
    // ======================

    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    const navSections = ["home", "about", "skills", "experience", "projects", "contact"]
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

    if (navSections.length > 0 && "IntersectionObserver" in window) {
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
                threshold: [0.2, 0.5],
                rootMargin: "-20% 0px -55% 0px",
            }
        );

        navSections.forEach((section) => navObserver.observe(section));
        setActiveNav("home");
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
            back.classList.toggle("pointer-events-none", !visible);
            back.classList.toggle("opacity-100", visible);
            back.classList.toggle("visible", visible);
        };

        window.addEventListener("scroll", updateBackToTop, { passive: true });
        updateBackToTop();

        back.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? "auto" : "smooth",
            });
        });
    }
});
