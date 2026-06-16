(function () {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealTargets = document.querySelectorAll(
        ".story-image, .story-line, .site-footer__text, .site-footer__main .app-store-badge"
    );

    if (revealTargets.length === 0) {
        return;
    }

    document.querySelectorAll(".story-intro, .story-copy").forEach((group) => {
        group.querySelectorAll(".story-line").forEach((line, index) => {
            line.style.setProperty("--reveal-delay", `${index * 150}ms`);
        });
    });

    if (prefersReducedMotion) {
        revealTargets.forEach((el) => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px 15% 0px",
        }
    );

    revealTargets.forEach((el) => observer.observe(el));
})();
