(function () {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const heroMedia = document.querySelector(".hero-media");

    if (heroMedia && prefersReducedMotion) {
        heroMedia.classList.remove("is-developing");
        heroMedia.classList.add("is-developed");
    }

    const storyMediaTargets = document.querySelectorAll(".story-media");
    const revealTargets = document.querySelectorAll(
        ".story-line, .site-footer__text, .site-footer__closing .app-store-badge"
    );

    if (prefersReducedMotion) {
        storyMediaTargets.forEach((el) => {
            el.classList.add("is-developed");
        });
        revealTargets.forEach((el) => el.classList.add("is-visible"));
        return;
    }

    document.querySelectorAll(".story-intro, .story-copy").forEach((group) => {
        group.querySelectorAll(".story-line").forEach((line, index) => {
            line.style.setProperty("--reveal-delay", `${index * 150}ms`);
        });
    });

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

    storyMediaTargets.forEach((el) => observer.observe(el));
    revealTargets.forEach((el) => observer.observe(el));
})();
