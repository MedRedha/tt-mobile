const template = document.createElement('template')
template.innerHTML = `
  <style>
  thead {
    color: var(--tt-color, blue);
  }
  </style>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Mannschaft</th>
        <th>Punkte</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>`

class TtLeague extends HTMLElement {
  connectedCallback() {
    // attach shadow DOM
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    fetch(
      'https://api.tt-mobile.ch/league?url=' +
        encodeURIComponent('/groupPage?championship=MTTV+18%2F19&group=203828')
    )
      .then(res => res.json())
      .then(res => this.updateTable(res))
      .catch(error => console.error('Error:', error))
  }

  updateTable(data) {
    console.log('updateTable', data)
    this.shadowRoot.querySelector('tbody').innerHTML = data.clubs
      .map(
        club => `<tr>
      <td>${club.rank}</td>
      <td>${club.name}</td>
      <td>${club.score}</td>
    </tr>`
      )
      .join('')
  }
}

customElements.define('tt-league', TtLeague)
