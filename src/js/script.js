document.addEventListener("DOMContentLoaded", () => {
	const menuToggle = document.getElementById("menu-toggle");
	const mobileMenu = document.getElementById("mobile-menu");
	const navLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

	if (menuToggle && mobileMenu) {
		menuToggle.addEventListener("click", () => {
			const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
			menuToggle.setAttribute("aria-expanded", String(!isExpanded));
			mobileMenu.classList.toggle("hidden");
		});

		mobileMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
			link.addEventListener("click", () => {
				menuToggle.setAttribute("aria-expanded", "false");
				mobileMenu.classList.add("hidden");
			});
		});
	}

	const revealElements = document.querySelectorAll(".reveal");
	const revealObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
					revealObserver.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.14,
			rootMargin: "0px 0px -8% 0px"
		}
	);

	revealElements.forEach((element, index) => {
		element.style.transitionDelay = `${Math.min(index * 40, 280)}ms`;
		revealObserver.observe(element);
	});

	const sectionElements = Array.from(document.querySelectorAll("main section[id]"));
	if (sectionElements.length === 0 || navLinks.length === 0) {
		return;
	}

	const setActiveLink = (id) => {
		navLinks.forEach((link) => {
			const match = link.getAttribute("href") === `#${id}`;
			if (match) {
				link.classList.add("text-white");
			} else {
				link.classList.remove("text-white");
			}
		});
	};

	const sectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActiveLink(entry.target.id);
				}
			});
		},
		{
			threshold: 0.5,
			rootMargin: "-15% 0px -35% 0px"
		}
	);

	sectionElements.forEach((section) => sectionObserver.observe(section));
});
