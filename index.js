let currentPage = 1;
        const perPage = 10;

        function getRepositories() {
            const username = document.getElementById('username').value;
            const apiUrl = `https://api.github.com/users/${username}`;
            const repoApiUrl = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${currentPage}`;

            document.getElementById('loader').style.display = 'block';

            // Fetch user information
            fetch(apiUrl)
                .then(response => response.json())
                .then(userData => {
                    document.getElementById('userImage').src = userData.avatar_url;
                    document.getElementById('userName').innerText = userData.login;
                    document.getElementById('userBio').innerText = userData.bio || 'No bio available';
                    document.getElementById('userLink').href = userData.html_url;
                })
                .catch(error => {
                    console.error('Error fetching user information:', error);
                });

            // Fetch repositories
            fetch(repoApiUrl)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('loader').style.display = 'none';
                    displayRepositories(data);

                    const prevBtn = document.getElementById('prevBtn');
                    const nextBtn = document.getElementById('nextBtn');

                    prevBtn.disabled = currentPage === 1;
                    nextBtn.disabled = data.length < perPage;

                    document.getElementById('pagination').style.display = 'block';
                })
                .catch(error => {
                    document.getElementById('loader').style.display = 'none';
                    console.error('Error fetching repositories:', error);
                });
        }

        function displayRepositories(repositories) {
            const repoList = document.getElementById('repoList');
            repoList.innerHTML = '';

            repositories.forEach(repo => {
                const listItem = document.createElement('li');
                listItem.classList.add('repo-item');
                listItem.innerHTML = `
                    <h3 class="repo-name">${repo.name}</h3>
                    <p>${repo.description || 'No description available'}</p>
                    <p class="repo-language">${repo.language || 'Not specified language'}</p>
                `;
                repoList.appendChild(listItem);
            });
        }

        function nextPage() {
            currentPage++;
            getRepositories();
        }

        function prevPage() {
            if (currentPage > 1) {
                currentPage--;
                getRepositories();
            }
        }