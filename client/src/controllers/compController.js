const uri = 'http://localhost:5000/'

const getComponents = (stateChange) => {
    fetch(uri, {
      method: 'get',
      mode: 'cors'
    })
    .then(res => res.json())
    .then(components => {
      stateChange(components)
    })
    .catch(error => {
      console.log('Request failed', error);
    })
}

const addComponent = (comp, callback) => {
  let url = uri + 'add',
  data = new FormData()
  data.append('file', comp.file)
  data.append('compName', comp.compName)
  data.append('desc', comp.desc)

  fetch(url, {
      method: 'post',
      mode: 'cors',
      body: data
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log(data)
      callback()
    });
}

const deleteComponent = (comp, callback) => {
  let url = uri + 'remove',

  data = new FormData()
  data.append('_id', comp._id)
  data.append('order', comp.order)

  fetch(url, {
      method: 'post',
      mode: 'cors',
      body: data
    }).then(response => {
      return response.json()
    }).then(data => {
      console.log(data)
      comp.getComponents()
  })
}

const updateComponent = (id, comp, callback) => {
  let url = uri + 'update',

  data = new FormData()
  data.append('_id', id)
  data.append('file', comp.file)
  data.append('compName', comp.compName)
  data.append('desc', comp.desc)
  data.append('order', comp.order)

  fetch(url, {
      method: 'post',
      mode: 'cors',
      body: data
    }).then(response => {
      return response.json()
    }).then(data => {
      console.log(data)
      callback()
  })
}

const sortComponents = async (components, callback) => {
  let url = uri + 'sort'

  await Promise.all(components.map(async (comp) => {
      let data = new FormData()
      data.append('_id', comp._id)
      data.append('order', comp.order)
      const reOrdered = await postCompOrder(data)
      return reOrdered
    })
  ).then(() => callback())

  async function postCompOrder(data) {
    fetch(url, {
      method: 'post',
      mode: 'cors',
      body: data
    }).then(response => {
      return response.json()
    })
  }
}

export default { getComponents, addComponent, deleteComponent, updateComponent, sortComponents }

