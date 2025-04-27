// MODEL
class ContactModel {
    constructor() {
      this.contacts = [];
    }
  
    addContact(name, phone) {
      const newContact = { id: Date.now(), name, phone };
      this.contacts.push(newContact);
    }
  
    deleteContact(id) {
      this.contacts = this.contacts.filter(contact => contact.id !== id);
    }
  
    updateContact(id, updatedName, updatedPhone) {
      const contact = this.contacts.find(contact => contact.id === id);
      if (contact) {
        contact.name = updatedName;
        contact.phone = updatedPhone;
      }
    }
  
    getContacts() {
      return this.contacts;
    }
  }
  
  // VIEW
  class ContactView {
    constructor() {
      this.contactListElement = document.getElementById('contact-list');
      this.form = document.getElementById('contact-form');
      this.nameInput = document.getElementById('name');
      this.phoneInput = document.getElementById('phone');
    }
  
    clearForm() {
      this.nameInput.value = '';
      this.phoneInput.value = '';
    }
  
    renderContacts(contacts, onEdit, onDelete) {
      this.contactListElement.innerHTML = '';
  
      contacts.forEach(contact => {
        const li = document.createElement('li');
        li.className = 'contact-item';
  
        li.innerHTML = `
          <span>${contact.name} - ${contact.phone}</span>
          <div class="contact-actions">
            <button data-id="${contact.id}" class="edit-btn">Edit</button>
            <button data-id="${contact.id}" class="delete-btn">Delete</button>
          </div>
        `;
  
        this.contactListElement.appendChild(li);
  
        li.querySelector('.edit-btn').addEventListener('click', () => onEdit(contact.id));
        li.querySelector('.delete-btn').addEventListener('click', () => onDelete(contact.id));
      });
    }
  }
  
  // CONTROLLER
  class ContactController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
  
      // Initial render
      this.view.renderContacts(this.model.getContacts(), this.handleEdit.bind(this), this.handleDelete.bind(this));
  
      // Handle form submit
      this.view.form.addEventListener('submit', this.handleAdd.bind(this));
    }
  
    handleAdd(event) {
      event.preventDefault();
      const name = this.view.nameInput.value.trim();
      const phone = this.view.phoneInput.value.trim();
  
      if (name && phone) {
        this.model.addContact(name, phone);
        this.view.clearForm();
        this.view.renderContacts(this.model.getContacts(), this.handleEdit.bind(this), this.handleDelete.bind(this));
      }
    }
  
    handleDelete(id) {
      this.model.deleteContact(id);
      this.view.renderContacts(this.model.getContacts(), this.handleEdit.bind(this), this.handleDelete.bind(this));
    }
  
    handleEdit(id) {
      const contact = this.model.getContacts().find(c => c.id === id);
      if (!contact) return;
  
      const newName = prompt('Masukkan nama baru:', contact.name);
      const newPhone = prompt('Masukkan nomor telepon baru:', contact.phone);
  
      if (newName && newPhone) {
        this.model.updateContact(id, newName.trim(), newPhone.trim());
        this.view.renderContacts(this.model.getContacts(), this.handleEdit.bind(this), this.handleDelete.bind(this));
      }
    }
  }
  
  // App Initialization
  document.addEventListener('DOMContentLoaded', () => {
    const model = new ContactModel();
    const view = new ContactView();
    new ContactController(model, view);
  });
  