import { updateChart } from "./chart.js";

const tbody = document.querySelector('tbody');

const form = document.querySelector('form');

const createHostModal = new bootstrap.Modal(document.getElementById('createHostModal'), {
  keyboard: false
});

export function loadHostsTable(hosts) {
  for (const host of hosts) {
    createHostRow(host);
  }
}

export function createHostRow(host) {
  const view = `<tr id="host-${host.id}">
    <td>${host.name}</td>
    <td>${host.address}</td>
    <td class="align-middle">
      <div class="d-flex justify-content-between">
        <i 
          class="fas fa-stopwatch me-2"
          onclick="showLatency(${host.id})"
        >
        </i>
        <i 
          class="fas fa-trash-alt"
          onclick="removeHost(${host.id})"
        >
        </i>
      </div>
    </td>
  </tr>`;

  tbody.insertAdjacentHTML('beforeend', view);
}

export function removeHost(id) {
  const tr = document.querySelector(`#host-${id}`);

  tr.remove();

  const url = `/hosts/${id}`;

  fetch(url, { method: 'delete' });
}

export function loadCreateHostSubmit() {
  form.onsubmit = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name').value;
    const address = document.querySelector('#address').value;
  
    const host = {name, address};

    createHostRow(host);

    const configRequest = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(host)
    };

    const url = '/hosts';

    fetch(url, configRequest);
  
    createHostModal.hide();
  }
}

export async function loadHosts() {
  const url = '/hosts';

  const hosts = await (await fetch(url)).json();

  loadHostsTable(hosts);
}

export async function showLatency(hostId) {
  const url = `/hosts/${hostId}/times`;

  const times = await (await fetch(url)).json();

  const values = [];

  for (const time of times) {
    values.push(time.value);
  }

  updateChart(values);
}
