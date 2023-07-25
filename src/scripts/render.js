import { readInfoUser } from "./requests.js";

export async function renderPosts(posts) {
  const postsContainer = document.querySelector('.posts__container');
  const infoUser = await readInfoUser();
  postsContainer.innerHTML = "";

  posts.forEach((post, index) => {
    if (infoUser.id === post.user.id) {
      postsContainer.insertAdjacentHTML('beforeend',
        `
      <li class="post">
        <div class="post-info">
          <img class="post-info__avatar" src="${post.user.avatar}" alt="foto de perfil de ${post.username}">
          <p class="post-info__username text-1">${post.user.username}</p> | 
          <p class="post-info__date text-1">${new Date(post.createdAt).toLocaleDateString()} às ${new Date(post.createdAt).toLocaleTimeString()}</p>
          <div class="post-buttons">
          <button data-edit-id="${post.id}" class="edit-post-button redirect-edit__button">Editar</button>
          <button data-remove-id="${post.id}" class="remove-post-button close-cancel__button">Excluir</button>
          </div>
        </div>
        <div class="post-content">
          <h2 class="title-2">${post.title}</h2>
          <p class="text-1">${post.content.slice(0, 144)}...</p>
        </div>
        <button class="access-post-button" data-post-id="${index}">Acessar publicação</button>
      </li>
      `
      )

    } else {
      postsContainer.insertAdjacentHTML('beforeend',
        `
      <li class="post">
        <div class="post-info">
          <img class="post-info__avatar" src="${post.user.avatar}" alt="foto de perfil de ${post.username}">
          <p class="post-info__username text-1">${post.user.username}</p> | 
          <p class="post-info__date text-1">${new Date(post.createdAt).toLocaleDateString()} às ${new Date(post.createdAt).toLocaleTimeString()}</p>
        </div>
        <div class="post-content">
          <h2 class="title-2">${post.title}</h2>
          <p class="text-1">${post.content.slice(0, 144)}...</p>
        </div>
        <button class="access-post-button" data-post-id="${index}">Acessar publicação</button>
      </li>
      `
      )
    }
  })
}

