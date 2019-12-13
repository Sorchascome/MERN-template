const getComponents = (stateChange) => {
    let url = 'http://localhost:5000/'

    fetch(url, {
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
    let url = 'http://localhost:5000/add',
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

const deleteComponent = (comp) => {
    let url = 'http://localhost:5000/remove'

    fetch(url, {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify({_id: comp._id})
      }).then(response => {
        return response.json()
      }).then(data => {
        console.log(data)
        comp.getComponents()
    })
}

const updateComponent = (id, comp, callback) => {
    let url = 'http://localhost:5000/update',
    
      data = new FormData()
      data.append('_id', id)
      data.append('file', comp.file)
      data.append('compName', comp.compName)
      data.append('desc', comp.desc)

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

export default { getComponents, addComponent, deleteComponent, updateComponent }

