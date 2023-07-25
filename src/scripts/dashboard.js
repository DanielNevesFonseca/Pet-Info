import { closeModal } from "./modal.js";
import { renderPosts } from "./render.js";
import { colorError, colorSuccess, createPost, deletePost, readAllPosts, readInfoUser, updatePost } from "./requests.js";
import { toast } from "./toasts.js";

const infoUserLogged = await readInfoUser();

function authentication() {
  const token = localStorage.getItem('@petInfo:token');

  if (!token) {
    window.location.replace('../../')
  }
}

function createProfileImage() {
  const container = document.querySelector('.container-info');
  container.insertAdjacentHTML('beforeend',
    `<img class="container-info__user-image" src="${infoUserLogged.avatar}" alt="Foto de perfil do usuário ${infoUserLogged.username}">`);
}

function showAddPostModal() {
  const button = document.querySelector('.new-post-button');
  const modalController = document.querySelector('.modal__controller--create-post');

  button.addEventListener('click', () => {
    modalController.showModal();
    closeModal(modalController.classList.value);
  })
}

async function showDash() {
  const allPosts = await readAllPosts();
  await renderPosts(allPosts);
  handleDeletePost();
  await handleReadWholePost();
  await handleUpdatePost();

}

async function handleNewPost() {
  const inputs = document.querySelectorAll('.create__post');
  const button = document.querySelector('.publish-button');
  const modalController = document.querySelector('.modal__controller--create-post');
  const newPost = {};
  let count = 0;

  button.addEventListener('click', async () => {

    inputs.forEach(input => {
      if (input.value.trim() === '') {
        count++;
      }
      newPost[input.name] = input.value;
    })

    if (count !== 0) {
      count = 0;
      toast('Por Favor, preencha todos os campos', colorError);
    } else {
      modalController.close();
      createPost(newPost).then(async() => {
        await showDash();
      });

      inputs.forEach(input => {
        input.value = '';
      })
    }
  })
}

async function handleReadWholePost() {
  const allPosts = await readAllPosts();
  await renderPosts(allPosts).then(() => {
    handleDeletePost(); // every time handleReadWholePost Executes, this func lose the buttons reference!
    const modalController = document.querySelector('.modal__controller--read-post');
    const modalContainer = document.querySelector('.modal__container--read-post');
    const buttons = document.querySelectorAll('.access-post-button');
    buttons.forEach((button, index) => {
      button.addEventListener('click', (event) => {

        const id = event.target.dataset.postId;

        if (allPosts[id]) {
          modalContainer.innerHTML = '';

          modalContainer.insertAdjacentHTML('afterbegin',
            `
              <div class="post-info">
                <img class="post-info__avatar" src="${allPosts[id].user.avatar}" alt="foto de perfil de ${allPosts[id].username}">
                <p class="post-info__username text-1">${allPosts[id].user.username}</p> | 
                <p class="post-info__date text-1">${new Date(allPosts[id].createdAt).toLocaleDateString()} às ${new Date(allPosts[id].createdAt).toLocaleTimeString()}</p>
              </div>
              <button class="close-modal-button close-cancel__button">X</button>
              <div class="post-content">
                <h2 class="title-2">${allPosts[id].title}</h2>
                <p class="text-1">${allPosts[id].content}</p>
              </div>
            `);
          
          modalController.showModal();
          closeModal(modalController.classList.value);
        }
      })
    })
  })
}

async function handleLogoutModal() {
  const userLogged = await readInfoUser();

  const modalController = document.querySelector('.modal__controller--logout');
  const modalContainer = document.querySelector('.modal__container--logout');
  const usernameTag = document.querySelector('.modal__container--logout > p');
  const imageUser = document.querySelector('.container-info__user-image');
  const logoutButton = document.querySelector('.logout-button');

  usernameTag.innerText = `@${(await userLogged.username).replaceAll(' ', '')}`;

  imageUser.addEventListener('click', () => {
    modalController.showModal();
    closeModal(modalController.classList.value);
  });

  logoutButton.addEventListener('click', () => {
    if (localStorage.getItem('@petInfo:token')) {
      localStorage.removeItem('@petInfo:token');
      window.location.replace('../../index.html');
    }
  })
}

function handleDeletePost() {

  const deleteButtons = document.querySelectorAll('.remove-post-button');
  const removePostButton = document.querySelector('.remove');
  const modalController = document.querySelector('.modal__controller--delete-post');
  const cancelButton = document.querySelector('.modal__container--delete-post .buttons-group .close-cancel__button');

  deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const id = event.target.dataset.removeId;
      modalController.showModal();
      closeModal(modalController.classList.value);

      removePostButton.addEventListener('click', (event) => {
        modalController.close()
        deletePost(id).then(async() => {
          await showDash();
        });
      });
    });


    cancelButton.addEventListener('click', () => {
      modalController.close();
    })
  })
}

async function handleUpdatePost() {

  const allPosts = await readAllPosts();
  const modalController = document.querySelector('.modal__controller--update-post');
  const inputs = document.querySelectorAll('.update__post');
  const editButtons = document.querySelectorAll('.edit-post-button');
  const saveButton = document.querySelector('.save');
  const cancelButton = document.querySelector('.modal__controller--update-post .buttons-group .cancel-button');
  const updateBody = {}
  editButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const id = event.target.dataset.editId;
      modalController.showModal();
      closeModal(modalController.classList.value);

      inputs.forEach(input => {
        if (input.name === 'title') {
          let titleText = 'eu sou title';

          allPosts.forEach(post => {
            if (post.id === id) {
              titleText = post.title
              input.value = titleText;
            }
          })
        } else if (input.name === 'content') {
          let contentText = 'eu sou content';
          input.value = contentText;

          allPosts.forEach(post => {
            if (post.id === id) {
              contentText = post.content
              input.value = contentText;

            }
          })
        }
      })

      saveButton.addEventListener('click', async (event) => {
        inputs.forEach(input => {
          updateBody[input.name] = input.value
        })

        modalController.close();
        await updatePost(id, updateBody).then(async () => {
          await showDash();
        })
      });
    });


    cancelButton.addEventListener('click', () => {
      modalController.close();
    })
  })
}


authentication();
createProfileImage();
await showDash();
showAddPostModal();
handleNewPost();
handleLogoutModal();
