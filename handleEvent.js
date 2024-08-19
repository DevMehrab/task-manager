// elements.js
export const elements = {
    buttons: {
        select: document.querySelector(".select-btn"),
        view: document.querySelectorAll(".view"),
        addTask: document.querySelector('.add-task'),
        edit: document.querySelector('.edit-btn'),
        delete: document.querySelector('.delete-btn')
    },
    tabs: document.querySelectorAll(".tab div"),
    summaries: {
        total: document.querySelector(".total-summury"),
        completed: document.querySelector(".comp-summury"),
        active: document.querySelector(".active-summury")
    },
    inputs: {
        title: document.querySelector('.title-input'),
        description: document.querySelector('.description-input'),
        slider: document.querySelector('.slider')
    },
    details: {
        detail:document.querySelector('.details'),
        title: document.querySelector('.title-details'),
        description: document.querySelector('.description-details')
    },
    miscellaneous: {
        created: document.querySelector('.created'),
        task: document.querySelector('.task'),
        span: document.querySelector('span'),
        modal: document.querySelector('.modal-container'),
        form: document.querySelector('.form'),
        updateForm: document.querySelector('.update-form'),
        handleMouse: document.querySelectorAll(".handle-mouse"),
        taskContainer: document.querySelector(".task-container")
    }
};

