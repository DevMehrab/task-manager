import { elements } from './handleEvent.js';
class Task {
  constructor(title, description, importance) {
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.id = parseInt(new Date().getTime())
    this.isActive = true;
    this.date = new Date().toString().split(' GMT+0600')[0]
  }

  static getTask() {
    return JSON.parse(localStorage.getItem('task')) || [
      {
        "title": "Grocery Shopping",
        "description": "Buy groceries for the week including fruits, vegetables, and dairy.",
        "importance": "Medium",
        "id": 1724085123456,
        "isActive": true,
        "date": "Mon Aug 19 2024 09:00:00"
      },
      {
        "title": "Doctor's Appointment",
        "description": "Annual check-up at the local clinic.",
        "importance": "High",
        "id": 1724085426789,
        "isActive": false,
        "date": "Mon Aug 19 2024 15:00:00"
      },
      {
        "title": "Read a Book",
        "description": "Finish reading the last two chapters of 'Atomic Habits'.",
        "importance": "Low",
        "id": 1724085729012,
        "isActive": true,
        "date": "Mon Aug 19 2024 21:00:00"
      }
    ]
      ;
  }

  static setTask(data) {
    const arr = this.getTask();
    arr.push(data);
    localStorage.setItem('task', JSON.stringify(arr));
  }
  static updateDatabase(data) {
    localStorage.setItem('task', JSON.stringify(data));
  }

  static displayUI(data) {
    let all = elements.summaries.total
    let active = elements.summaries.active
    let complete = elements.summaries.completed
    let completeArr = []
    let activeArr = []

    const arr = data || this.getTask();
    const taskContainer = elements.miscellaneous.taskContainer;
    // Clear existing tasks
    taskContainer.innerHTML = '';
    arr.forEach(element => {
      if (element.isActive) {
        activeArr.push(element)
      }
      if (!element.isActive) {
        completeArr.push(element)
      }
      all.innerHTML = 'Total: ' + arr.length
      active.innerHTML = 'Active: ' + activeArr.length
      complete.innerHTML = 'Completed: ' + completeArr.length
      let icon = "checkbox-outline"
      let style = 'none'
      if (!element.isActive) {
        icon = "checkbox"
        style = "line"
      }
      const div = document.createElement('div');
      div.classList.add('task', 'flex', 'full', 'fl-bt');
      div.innerHTML = `
        <div class="flex handle-mouse" data-id="${element.id}">
          <ion-icon name="${icon}"></ion-icon>
          <p class='${style}'>${element.title}</p>
        </div>
        <div class="view" id-data='${element.id}' >View</div>`;
      taskContainer.appendChild(div);
    });

    elements.miscellaneous.modal.style.display = 'none';
  }

  // Method to edit a task

  // Method to delete a task
  static deleteTask(id) {
    let arr = this.getTask();
    arr = arr.filter(task => parseInt(task.id) !== parseInt(id));
    this.updateDatabase(arr);
    this.displayUI();
  }

  static statusToggle(id) {
    let arr = Task.getTask()
    arr.forEach(e => {
      if (parseInt(e.id) === parseInt(id)) {
        e.isActive = !e.isActive
      }
    })
    Task.updateDatabase(arr)
  }
  static displayPopUp(id) {
    let arr = Task.getTask()
    let obj;
    arr.forEach(e => {
      if (parseInt(e.id) === parseInt(id)) {
        obj = e
      }
    })

    elements.miscellaneous.modal.style.display = 'flex'
    elements.details.detail.style.display = 'flex'
    elements.details.detail.innerHTML =
      `
    <div>
        <p class="created">Created: ${obj.date}</p>
        <h3 class="title-details">${obj.title} <span>${obj.importance}</span></h3>
        <p class="description-details">${obj.description}</p>
    </div>
    <aside class="details-btn full">
        <button class="delete-btn full" data-id='${obj.id}'>Delete</button>
    </aside>
    `
  }
}

// Add event listeners after the DOM is loaded
window.onload = () => {
  Task.displayUI();

  elements.buttons.select.addEventListener('click', () => {
    elements.miscellaneous.modal.style.display = 'flex';
    elements.miscellaneous.form.style.display = 'flex';
  });

  elements.miscellaneous.modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-container')) {
      elements.miscellaneous.modal.style.display = 'none';
      elements.miscellaneous.form.style.display = 'none';
    }
  });

  elements.buttons.addTask.addEventListener('click', () => {
    elements.miscellaneous.modal.style.display = 'none';
    elements.miscellaneous.form.style.display = 'none';
    const title = elements.inputs.title.value;
    const description = elements.inputs.description.value;
    const level = elements.inputs.slider.value;
    let arr = ['Low', 'Medium', 'High']

    const task = new Task(title, description, arr[level - 1]);
    elements.inputs.title.value = ''
    elements.inputs.description.value = ''
    
    Task.setTask(task);
    Task.displayUI();
  });

  // Event delegation for handle-mouse elements
  elements.miscellaneous.taskContainer.addEventListener('click', (e) => {
    const target = e.target;
    const handleMouseElement = target.closest('.handle-mouse');

    if (handleMouseElement) {
      const icon = handleMouseElement.querySelector('ion-icon');
      const text = handleMouseElement.querySelector('p');
      Task.statusToggle(handleMouseElement.getAttribute('data-id'));
      Task.displayUI();

      if (icon.getAttribute('name') === 'checkbox-outline') {
        icon.setAttribute('name', 'checkbox');
      } else {
        icon.setAttribute('name', 'checkbox-outline');
      }

      if (text.classList.contains('line')) {
        text.classList.remove('line');
      } else {
        text.classList.add('line');
      }
    }
  });
};

elements.tabs.forEach(e => {
  e.addEventListener('click', event => {
    elements.tabs.forEach(el => {
      el.classList.remove('target')
    })
    let arr = Task.getTask()
    if (event.target.innerHTML === 'Active') {
      e.classList.add('target')
      let newArr = arr.filter(e => {
        return e.isActive === true
      })
      Task.displayUI(newArr, event.target)
    }
    else if (event.target.innerHTML === 'Completed') {
      e.classList.add('target')
      let newArr = arr.filter(e => {
        return e.isActive === false
      })
      Task.displayUI(newArr, event.target)
    }
    else {
      e.classList.add('target')
      Task.displayUI()
    }

  })
})


elements.miscellaneous.taskContainer.addEventListener('click', (e) => {
  const target = e.target;
  const handleMouseElement = target.closest('.view');

  if (handleMouseElement) {
    elements.miscellaneous.modal.style.display = 'flex';
    elements.details.detail.style.display = 'flex';

    elements.miscellaneous.modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-container')) {
        elements.miscellaneous.modal.style.display = 'none';
        elements.details.detail.style.display = 'none';
      }
    });
    Task.displayPopUp(handleMouseElement.getAttribute('id-data'))
  }
});



elements.details.detail.addEventListener('click', e => {
  if (e.target.classList.contains('delete-btn')) {
    Task.deleteTask(e.target.getAttribute('data-id'));
    elements.details.detail.style.display = 'none';
  }
});

