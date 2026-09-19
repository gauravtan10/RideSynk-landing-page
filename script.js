document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for scroll animations (Reveal classes)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 2. Parallax effect for the hero section
    const heroTitle = document.querySelector('.hero-headline');
    const heroSub = document.querySelector('.hero-subheadline');
    const heroLogoText = document.querySelector('.hero-logo-text');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        if (scrolled < window.innerHeight) {
            if (heroTitle) heroTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
            if (heroSub) heroSub.style.transform = `translateY(${scrolled * 0.2}px)`;
            if (heroLogoText) heroLogoText.style.transform = `translateY(${scrolled * 0.1}px)`;
            
            // Fade out down arrow
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if(scrollIndicator) {
                scrollIndicator.style.opacity = 1 - (scrolled / 300);
            }
        }
    });

    // 3. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
            navbar.style.padding = '1rem 0';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.7)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1.5rem 0';
        }
    });

    // 4. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 5. Timeline interactive items toggle
    const timelineItems = document.querySelectorAll('.timeline-item.interactive');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            // Check if currently open
            const isOpen = item.classList.contains('show-details');
            
            // First close all other items
            timelineItems.forEach(otherItem => {
                otherItem.classList.remove('show-details');
            });
            
            // If it wasn't open, open it (otherwise it stays closed, acting as a toggle off)
            if (!isOpen) {
                item.classList.add('show-details');
            }
        });
    });
    // 6. Waitlist Form Submission
    const waitlistForm = document.getElementById("waitlistForm");
    if (waitlistForm) {
        waitlistForm.addEventListener("submit", async function(e) {
            e.preventDefault();

            const name = e.target.name.value;
            const email = e.target.email.value;
            const submitBtn = e.target.querySelector('button[type="submit"]');

            // Optional loading state
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = "Joining...";
            submitBtn.disabled = true;

            try {
                await fetch("https://hook.us2.make.com/q3oct9kq5pjpk67t9zomgv5c6cs9nsqk", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email
                    })
                });

                alert("Thank you! Check your email.");
                waitlistForm.reset();
            } catch (error) {
                console.error("Error submitting form:", error);
                alert("There was an error joining the waitlist. Please try again later.");
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // 7. Supabase Feedback & Community Responses System
    const SUPABASE_URL = "https://dsiwrotsqvjfjonrctdy.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzaXdyb3RzcXZqZmpvbnJjdGR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTU3OTQsImV4cCI6MjA4NzY5MTc5NH0.56By-U13BEPNm2VGj2mlFyzVUy8Py8xR5d0zS7x5GoY";

    function renderStarRatingHtml(rating) {
        const r = Math.min(Math.max(parseInt(rating, 10) || 5, 1), 5);
        let starsSvg = "";
        for (let i = 1; i <= 5; i++) {
            const isEmpty = i > r;
            starsSvg += `<svg class="${isEmpty ? 'empty' : ''}" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
        }
        return `
            <div class="rc-star-rating" title="${r} out of 5 stars">
                <div class="rc-stars-row">${starsSvg}</div>
                <span class="rc-rating-num">${r}.0</span>
            </div>`;
    }

    function formatTimeAgo(isoString) {
        if (!isoString) return "";
        const date = new Date(isoString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        if (seconds < 60) return "Just now";
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days}d ago`;
        return date.toLocaleDateString();
    }

    function escapeHtml(str) {
        if (!str) return "";
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    const btnTabFeedback = document.getElementById("btnTabFeedback");
    const btnTabResponses = document.getElementById("btnTabResponses");
    const feedbackFormContainer = document.getElementById("feedbackFormContainer");
    const feedbackResponsesContainer = document.getElementById("feedbackResponsesContainer");
    const fbResponsesCount = document.getElementById("fbResponsesCount");
    const responsesList = document.getElementById("responsesList");
    const feedbackForm = document.getElementById("feedbackForm");
    const feedbackSuccessMsg = document.getElementById("feedbackSuccessMsg");
    const btnSeeResponsesAfterSubmit = document.getElementById("btnSeeResponsesAfterSubmit");
    const filterAllBtn = document.getElementById("filterAllResponses");
    const filterAnsweredBtn = document.getElementById("filterAnsweredResponses");

    // 7.1 Interactive Star Rating Setup
    const starRatingContainer = document.getElementById("starRatingContainer");
    const starRatingCaption = document.getElementById("starRatingCaption");
    const starButtons = starRatingContainer ? starRatingContainer.querySelectorAll(".star-btn") : [];

    const ratingDescriptions = {
        1: "1.0 / 5.0 — Needs Improvement",
        2: "2.0 / 5.0 — Fair",
        3: "3.0 / 5.0 — Good",
        4: "4.0 / 5.0 — Very Good",
        5: "5.0 / 5.0 — Outstanding"
    };

    let selectedRating = 5;

    function updateStarsVisual(ratingValue, isHover = false) {
        starButtons.forEach(btn => {
            const val = parseInt(btn.dataset.value, 10);
            if (isHover) {
                btn.classList.toggle("is-hover", val <= ratingValue);
            } else {
                btn.classList.remove("is-hover");
                btn.classList.toggle("is-active", val <= ratingValue);
            }
        });
        if (starRatingCaption) {
            starRatingCaption.textContent = ratingDescriptions[ratingValue] || `${ratingValue}.0 / 5.0`;
        }
    }

    if (starRatingContainer && starButtons.length > 0) {
        // Initialize 5 stars by default
        updateStarsVisual(5);

        starButtons.forEach(btn => {
            const val = parseInt(btn.dataset.value, 10);

            // Hover preview
            btn.addEventListener("mouseenter", () => {
                updateStarsVisual(val, true);
            });

            // Click selection
            btn.addEventListener("click", () => {
                selectedRating = val;
                const radio = document.getElementById(`r${val}`);
                if (radio) radio.checked = true;
                updateStarsVisual(val, false);
            });
        });

        // Reset to selected on mouse leave
        starRatingContainer.addEventListener("mouseleave", () => {
            starButtons.forEach(btn => btn.classList.remove("is-hover"));
            updateStarsVisual(selectedRating, false);
        });
    }

    let cachedResponses = [];
    let currentFilter = "all";

    function switchFeedbackTab(target) {
        if (target === "feedback") {
            btnTabFeedback.classList.add("active");
            btnTabResponses.classList.remove("active");
            feedbackFormContainer.style.display = "block";
            feedbackResponsesContainer.style.display = "none";
        } else {
            btnTabResponses.classList.add("active");
            btnTabFeedback.classList.remove("active");
            feedbackFormContainer.style.display = "none";
            feedbackResponsesContainer.style.display = "block";
            loadResponses();
        }
    }

    if (btnTabFeedback && btnTabResponses) {
        btnTabFeedback.addEventListener("click", () => switchFeedbackTab("feedback"));
        btnTabResponses.addEventListener("click", () => switchFeedbackTab("responses"));
    }

    if (btnSeeResponsesAfterSubmit) {
        btnSeeResponsesAfterSubmit.addEventListener("click", () => {
            switchFeedbackTab("responses");
        });
    }

    if (filterAllBtn && filterAnsweredBtn) {
        filterAllBtn.addEventListener("click", () => {
            currentFilter = "all";
            filterAllBtn.classList.add("active");
            filterAnsweredBtn.classList.remove("active");
            renderResponses();
        });
        filterAnsweredBtn.addEventListener("click", () => {
            currentFilter = "answered";
            filterAnsweredBtn.classList.add("active");
            filterAllBtn.classList.remove("active");
            renderResponses();
        });
    }

    async function loadResponses() {
        if (!responsesList) return;
        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/feedback_questions?is_deleted=eq.false&order=created_at.desc`, {
                headers: {
                    "apikey": SUPABASE_ANON_KEY,
                    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
                }
            });
            if (!res.ok) throw new Error("Failed to fetch responses");
            const data = await res.json();
            cachedResponses = data || [];
            if (fbResponsesCount) {
                fbResponsesCount.textContent = cachedResponses.length;
            }
            renderResponses();
        } catch (err) {
            console.error("Error loading responses:", err);
            responsesList.innerHTML = `
                <div class="responses-empty">
                    <p style="color:#ef4444;">Unable to load responses right now. Please try again soon.</p>
                </div>`;
        }
    }

    function renderResponses() {
        if (!responsesList) return;
        let items = cachedResponses;
        if (currentFilter === "answered") {
            items = items.filter(r => r.dev_response && r.dev_response.trim().length > 0);
        }

        if (items.length === 0) {
            responsesList.innerHTML = `
                <div class="responses-empty">
                    <div class="responses-empty-icon">${currentFilter === "answered" ? "⏳" : "💬"}</div>
                    <p>${currentFilter === "answered" ? "No developer answers posted yet. Questions are currently being reviewed!" : "No thoughts or questions submitted yet. Be the first to ask!"}</p>
                </div>`;
            return;
        }

        responsesList.innerHTML = items.map(item => {
            const avatarInitial = (item.name || "R").charAt(0).toUpperCase();
            const ratingHtml = renderStarRatingHtml(item.rating);
            const timeAgo = formatTimeAgo(item.created_at);
            const devTimeAgo = formatTimeAgo(item.dev_responded_at);

            let devSectionHtml = "";
            if (item.dev_response && item.dev_response.trim()) {
                devSectionHtml = `
                    <div class="dev-reply-box">
                        <div class="dev-reply-header">
                            <span class="dev-reply-badge">
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                                RideSynk Developer Response
                            </span>
                            <span class="dev-reply-date">${devTimeAgo}</span>
                        </div>
                        <p class="dev-reply-content">${escapeHtml(item.dev_response)}</p>
                    </div>`;
            } else {
                devSectionHtml = `
                    <div style="margin-top: 0.5rem;">
                        <span class="awaiting-reply-badge">⏳ Awaiting Developer Reply</span>
                    </div>`;
            }

            return `
                <div class="response-card">
                    <div class="response-card-header">
                        <div class="rc-user-meta">
                            <div class="rc-avatar">${escapeHtml(avatarInitial)}</div>
                            <span class="rc-user-name">${escapeHtml(item.name || "Rider")}</span>
                            ${ratingHtml}
                        </div>
                        <span class="rc-date">${timeAgo}</span>
                    </div>
                    <div class="rc-question-text">${escapeHtml(item.message)}</div>
                    ${devSectionHtml}
                </div>`;
        }).join("");
    }

    // Initial silent load of count
    loadResponses();

    // Feedback Form Submission
    if (feedbackForm) {
        feedbackForm.addEventListener("submit", async function(e) {
            e.preventDefault();

            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            const formData = new FormData(feedbackForm);
            const name = formData.get("name")?.toString().trim();
            const email = formData.get("email")?.toString().trim() || null;
            const message = formData.get("message")?.toString().trim();
            const rating = selectedRating || parseInt(formData.get("rating")?.toString() || "5", 10);

            if (!name || !message) {
                alert("Please provide both your name and your thoughts/question.");
                return;
            }

            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            try {
                // 1. Save directly into Supabase database
                const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/feedback_questions`, {
                    method: "POST",
                    headers: {
                        "apikey": SUPABASE_ANON_KEY,
                        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                        "Content-Type": "application/json",
                        "Prefer": "return=representation"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        rating: rating,
                        message: message,
                        status: "pending",
                        is_deleted: false
                    })
                });

                if (!insertRes.ok) {
                    throw new Error("Could not store feedback in database");
                }

                // 2. Also forward to Formspree for developer email alerts (non-blocking)
                fetch("https://formspree.io/f/mvoezpzv", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({ name, email, rating, message })
                }).catch(() => {});

                // Show success UI
                feedbackForm.reset();
                selectedRating = 5;
                updateStarsVisual(5);
                feedbackForm.style.display = "none";
                if (feedbackSuccessMsg) {
                    feedbackSuccessMsg.style.display = "block";
                }

                // Reload responses so it shows up in community view
                await loadResponses();

            } catch (error) {
                console.error("Error submitting feedback:", error);
                alert("Oops! There was an error sending your feedback. Please try again.");
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // 8. Smooth transition and smart PWA routing for Try Now button
    const tryNowBtn = document.getElementById('tryNowBtn');
    if (tryNowBtn) {
        // In local development, route to local PWA dev server on port 8080
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        if (isLocal) {
            tryNowBtn.href = 'http://localhost:8080';
        }
        tryNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href') || 'https://app.ridesynk.in';
            
            document.body.style.transition = 'opacity 0.3s ease-out';
            document.body.style.opacity = '0';
            
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300);
        });
    }

    // Handle back button restoring page with opacity 0
    window.addEventListener('pageshow', (event) => {
        if (event.persisted || document.body.style.opacity === '0') {
            document.body.style.opacity = '1';
        }
    });
});
