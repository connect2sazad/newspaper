document.addEventListener('DOMContentLoaded', function() {
    const listContainer = document.getElementById('list-container');
    const mainTitle = document.getElementById('main-title');
    const mainContent = document.getElementById('main-content');
    let currentActive = null;

    // Sort sidebar items by date in descending order
    sidebar.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Load sidebar items
    sidebar.forEach(item => {
        const a = document.createElement('a');
        a.href = '#';
        a.className = 'list-group-item list-group-item-action py-3 lh-tight';
        a.setAttribute('data-selector', item.selector);
        a.innerHTML = `
            <div class="d-flex w-100 align-items-center justify-content-between">
                <strong class="mb-1">${item.title}</strong>
                <small>${item.day}</small>
            </div>
            <div class="col-10 mb-1 small">${item.heading}</div>
        `;

        a.addEventListener('click', function(event) {
            event.preventDefault();
            if (currentActive) {
                currentActive.classList.remove('bg-primary', 'text-white');
            }
            this.classList.add('bg-primary', 'text-white');
            currentActive = this;
            showContent(this.getAttribute('data-selector'));
        });

        listContainer.appendChild(a);
    });

    // Function to show content based on the selector
    function showContent(selector) {
        const contentItem = updates.find(item => item.selector === selector);
        if (contentItem) {
            mainTitle.textContent = contentItem.title;
            mainContent.innerHTML = `
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                ${contentItem.title}
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${contentItem.heading}</h5>
                                <p class="card-text">${contentItem.content}</p>
                                <p class="card-text"><small class="text-muted">${contentItem.date} at ${contentItem.time}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Display the first item content by default
    if (sidebar.length > 0) {
        const firstItem = listContainer.querySelector(`[data-selector="${sidebar[0].selector}"]`);
        firstItem.classList.add('bg-primary', 'text-white');
        currentActive = firstItem;
        showContent(sidebar[0].selector);
    }

});


document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('searchbox');
    const listContainer = document.getElementById('list-container');
    const listItems = listContainer.getElementsByClassName('list-group-item');

    searchBox.addEventListener('input', () => {
        const searchText = searchBox.value.toLowerCase();
        for (let item of listItems) {
            const itemText = item.textContent.toLowerCase();
            if (itemText.includes(searchText)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
});