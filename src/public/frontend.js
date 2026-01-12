const apiBase = "/blogs";
const form = document.getElementById("blog-form");
const statusEl = document.getElementById("status");
const listEl = document.getElementById("blog-list");
const submitBtn = document.getElementById("submit-btn");
const clearBtn = document.getElementById("clear-btn");
const refreshBtn = document.getElementById("refresh-btn");
const themeToggle = document.getElementById("theme-toggle");
const searchInput = document.getElementById("search-input");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const titleCount = document.getElementById("title-count");
const bodyCount = document.getElementById("body-count");
const toastContainer = document.getElementById("toast-container");

const totalPostsEl = document.getElementById("total-posts");
const totalAuthorsEl = document.getElementById("total-authors");
const latestDateEl = document.getElementById("latest-date");

let editingId = null;
let allPosts = [];

const initTheme = () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
};

const updateThemeIcon = (theme) => {
  const icon = themeToggle.querySelector("i");
  icon.className = "fas fa-circle-half-stroke";
  icon.style.transform = theme === "dark" ? "rotate(180deg)" : "rotate(0deg)";
};

const showToast = (message, type = "success") => {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icon = type === "success" ? "fa-check-circle" : "fa-exclamation-circle";
  toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = "slideInRight 0.3s ease-out reverse";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

const setStatus = (message, type = "") => {
  if (!message) {
    statusEl.textContent = "";
    statusEl.className = "status";
    return;
  }
  const icon = type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle";
  statusEl.innerHTML = `<i class="fas ${icon}"></i>${message}`;
  statusEl.className = `status ${type}`;
};

const formatDate = (value) => {
  if (!value) return "Unknown";
  const date = new Date(value);
  const now = new Date();
  const diff = now - date;
  
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
  
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const formatShortDate = (value) => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const updateStats = (posts) => {
  totalPostsEl.textContent = posts.length;
  
  const authors = new Set(posts.map(p => p.author || "Anonymous"));
  totalAuthorsEl.textContent = authors.size;
  
  if (posts.length > 0) {
    const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    latestDateEl.textContent = formatShortDate(sortedPosts[0].createdAt);
  } else {
    latestDateEl.textContent = "—";
  }
};

const escapeHtml = (text) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

const renderPosts = (posts) => {
  if (!posts.length) {
    listEl.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-feather"></i>
        <p>No posts yet. Create one to get started!</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = "";
  posts.forEach((post, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "post";
    wrapper.style.animationDelay = `${index * 0.05}s`;
    wrapper.innerHTML = `
      <h3>${escapeHtml(post.title)}</h3>
      <div class="post-meta">
        <span><i class="fas fa-user"></i> ${escapeHtml(post.author || "Anonymous")}</span>
        <span><i class="fas fa-clock"></i> ${formatDate(post.createdAt)}</span>
      </div>
      <p class="post-body">${escapeHtml(post.body)}</p>
      <div class="post-actions">
        <button class="secondary" data-action="edit" data-id="${post._id}">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="danger" data-action="delete" data-id="${post._id}">
          <i class="fas fa-trash"></i> Delete
        </button>
      </div>
    `;
    listEl.appendChild(wrapper);
  });
};

const filterPosts = (query) => {
  const q = query.toLowerCase().trim();
  if (!q) {
    renderPosts(allPosts);
    return;
  }
  const filtered = allPosts.filter(post => 
    post.title.toLowerCase().includes(q) || 
    post.body.toLowerCase().includes(q) ||
    (post.author || "").toLowerCase().includes(q)
  );
  renderPosts(filtered);
};

const fetchPosts = async () => {
  refreshBtn.classList.add("spinning");
  listEl.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <span>Loading posts...</span>
    </div>
  `;
  
  try {
    const res = await fetch(apiBase);
    const data = await res.json();
    allPosts = Array.isArray(data) ? data : [];
    renderPosts(allPosts);
    updateStats(allPosts);
  } catch (error) {
    console.error(error);
    showToast("Failed to load posts", "error");
    listEl.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Failed to load posts. Please try again.</p>
      </div>
    `;
  } finally {
    refreshBtn.classList.remove("spinning");
  }
};

const resetForm = () => {
  form.reset();
  editingId = null;
  submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Publish';
  setStatus("");
  titleCount.textContent = "0";
  bodyCount.textContent = "0";
};

const updateCharCount = () => {
  titleCount.textContent = titleInput.value.length;
  bodyCount.textContent = bodyInput.value.length;
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const payload = {
    title: form.title.value.trim(),
    body: form.body.value.trim(),
    author: form.author.value.trim()
  };

  if (!payload.title || !payload.body) {
    setStatus("Title and body are required.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

  try {
    const res = await fetch(editingId ? `${apiBase}/${editingId}` : apiBase, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Request failed");
    }

    showToast(editingId ? "Post updated successfully!" : "Post published successfully!");
    resetForm();
    await fetchPosts();
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Something went wrong.", "error");
    showToast(error.message || "Something went wrong", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = editingId ? '<i class="fas fa-save"></i> Update' 
    : '<i class="fas fa-paper-plane"></i> Publish';
  }
});

listEl.addEventListener("click", async (event) => {
  const target = event.target.closest("button");
  if (!target) return;
  
  const id = target.getAttribute("data-id");
  const action = target.getAttribute("data-action");
  if (!id) return;

  if (action === "edit") {
    try {
      const res = await fetch(`${apiBase}/${id}`);
      const data = await res.json();
      form.title.value = data.title || "";
      form.body.value = data.body || "";
      form.author.value = data.author || "";
      editingId = id;
      submitBtn.innerHTML = '<i class="fas fa-save"></i> Update';
      setStatus("Editing post. Update the fields and submit.", "success");
      updateCharCount();
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      console.error(error);
      showToast("Failed to load post", "error");
    }
  }

  if (action === "delete") {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    target.disabled = true;
    target.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    try {
      const res = await fetch(`${apiBase}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Delete failed");
      }
      showToast("Post deleted successfully!");
      await fetchPosts();
    } catch (error) {
      console.error(error);
      showToast(error.message || "Failed to delete post", "error");
      target.disabled = false;
      target.innerHTML = '<i class="fas fa-trash"></i> Delete';
    }
  }
});

clearBtn.addEventListener("click", resetForm);
refreshBtn.addEventListener("click", fetchPosts);
themeToggle.addEventListener("click", toggleTheme);
searchInput.addEventListener("input", (e) => filterPosts(e.target.value));
titleInput.addEventListener("input", updateCharCount);
bodyInput.addEventListener("input", updateCharCount);

initTheme();
fetchPosts();
