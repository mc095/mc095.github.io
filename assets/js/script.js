const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    
    const searchToggle = document.querySelector('.search-toggle');
    const searchContainer = document.querySelector('.search-container');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    const postElements = document.querySelectorAll('.post-data');


    const postsData = Array.from(postElements).map(el => ({
      title: el.dataset.title,
      url: el.dataset.url,
      content: el.dataset.content,
      excerpt: el.dataset.excerpt,
      date: el.dataset.date
    }));

    let searchTimeout;

    function openSearch() {
      document.body.style.overflow = 'hidden';
      searchContainer.classList.add('visible');
      searchOverlay.classList.add('visible');
      searchInput.focus();
    }

    function closeSearch() {
      document.body.style.overflow = '';
      searchContainer.classList.remove('visible');
      searchOverlay.classList.remove('visible');
      searchResults.classList.remove('visible');
      searchInput.value = '';
    }

    function highlightText(text, query) {
      if (!query) return text;
      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    }

    function getContentMatch(content, query) {
      const index = content.toLowerCase().indexOf(query.toLowerCase());
      if (index === -1) return null;
      
      const start = Math.max(0, index - 50);
      const end = Math.min(content.length, index + 100);
      let excerpt = content.slice(start, end);
      
      if (start > 0) excerpt = '...' + excerpt;
      if (end < content.length) excerpt = excerpt + '...';
      
      return highlightText(excerpt, query);
    }

    searchToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (searchContainer.classList.contains('visible')) {
        closeSearch();
      } else {
        openSearch();
      }
    });

    searchOverlay.addEventListener('click', closeSearch);

    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.toLowerCase().trim();
      
      if (query.length < 2) {
        searchResults.classList.remove('visible');
        return;
      }

      searchTimeout = setTimeout(() => {
        const results = postsData.filter(post => {
          const searchableText = `${post.title} ${post.content} ${post.excerpt}`.toLowerCase();
          return searchableText.includes(query);
        });

        if (results.length > 0) {
          searchResults.innerHTML = results.map(post => {
            const contentMatch = getContentMatch(post.content, query);
            const titleMatch = highlightText(post.title, query);
            
            return `
              <div class="search-result-item" onclick="window.location.href='${post.url}'">
                <div class="search-result-header">
                  <strong>${titleMatch}</strong>
                  <span class="search-result-date">${post.date}</span>
                </div>
                ${contentMatch ? `
                  <div class="search-result-content">
                    ${contentMatch}
                  </div>
                ` : ''}
                ${post.excerpt ? `
                  <div class="search-result-excerpt">
                    ${highlightText(post.excerpt, query)}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('');
          searchResults.classList.add('visible');
        } else {
          searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
          searchResults.classList.add('visible');
        }
      }, 150);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchContainer.classList.contains('visible')) {
        closeSearch();
      }
    });



    function initReadingProgress() {
        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
          // Show latest post popup with delay
          setTimeout(() => {
            const latestPost = postsData[0];
            if (latestPost) {
              const latestLink = document.getElementById('latestPostLink');
              latestLink.href = latestPost.url;
              latestLink.textContent = latestPost.title;
              document.getElementById('latestPostPopup').classList.add('show');
            }
          }, 1000);
      
          // Show continue reading popup with delay
          setTimeout(() => {
            const lastPost = JSON.parse(localStorage.getItem('lastVisitedPost'));
            if (lastPost && lastPost.path !== '/' && lastPost.path !== '/index.html') {
              const continueLink = document.getElementById('lastPostLink');
              continueLink.href = lastPost.path;
              continueLink.textContent = lastPost.title;
              document.getElementById('continueReadingPopup').classList.add('show');
            }
          }, 1500);
        }
      
        // Track current blog post
        if (document.querySelector('.post-content')) {
          const currentPath = window.location.pathname;
          const currentTitle = document.title.split(' - ')[0];
          localStorage.setItem('lastVisitedPost', JSON.stringify({
            path: currentPath,
            title: currentTitle,
            timestamp: new Date().getTime()
          }));
        }
      }
      
      function closePopup(popupId) {
        const popup = document.getElementById(popupId);
        popup.classList.remove('show');
      }
      
      document.addEventListener('DOMContentLoaded', initReadingProgress);