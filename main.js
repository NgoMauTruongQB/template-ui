// Toast function
function toast({
    title = 'suceess test', 
    message = '', 
    type = 'infor', 
    duration = 3000
}) {
    const main = document.getElementById('toast')
    if(main) {
        const toast = document.createElement('div')

        //Auto remove toast 
        const autoRemoveId = setTimeout(function() {
            main.removeChild(toast)
        }, duration + 1000)

        //remove toast when click
        toast.onclick = function(e) {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast)
                clearTimeout(autoRemoveId)
            }
        }

        const icons = {
            success: 'fa-solid fa-circle-check',
            infor: 'fa-solid fa-circle-info',
            warning: 'fa-solid fa-triangle-exclamation',
            error: 'fa-solid fa-circle-xmark'
        }

        const icon = icons[type]
        const delay = (duration / 1000).toFixed(2)
        
        toast.classList.add('toast', `toast--${type}`)
        toast.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`
        
        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fa-solid fa-xmark"></i>
            </div>
        `
        main.appendChild(toast)
    }
}

function showSuccessToast() {
    toast({
        title: 'Success',
        message: 'Kết nối thành công với internet (Window, Unbutus, MacOS)',
        type: 'success',
        duration: 5000
    })
}

function showErrorToast() {
    toast({
        title: 'Error',
        message: 'Kết nỗi không thành công',
        type: 'error',
        duration: 5000
    })
}