import {Database} from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'


const database = new Database

export const routes =
    [

        {
            method: 'POST',
            path: buildRoutePath('/tasks'),
            handler: (req, res) => {

                const tasks = database.select('tasks')
            const {id, title, description,} = req.body

            if (id, title, description){
                const data = {

                    id: randomUUID(),
                    title,
                    description,
                    completed_at: null,
                    created_at: new Date().toLocaleDateString(),
                    update_at: new Date().toLocaleDateString(),

                }

                database.insert('tasks', data)
            }

            return res.end(JSON.stringify(tasks))

            }
        },
        {
            method: 'GET',
            path: buildRoutePath('/tasks'),
            handler: (req, res) => {


              const data = database.select('tasks')
              return  res.end(JSON.stringify(data))

                
            }
        },
        {
            method: 'PUT',
            path: buildRoutePath('/tasks/:id'),
            handler: (req, res) => {

                const {id} = req.params
                const {title, description} = req.body
                
                if(title, description) {
                    database.update('tasks', id, {
                        title,
                        description,
                    
                        update_at: new Date().toLocaleDateString(),
                        
                        
                    })
                }

               

                return res.writeHead(204).end()
            }
        },
        {
            method: 'DELETE',
            path: buildRoutePath('/tasks/:id'),
            handler: (req, res) => {

                const {id} = req.params

                database.delete('tasks', id)
                return res.writeHead(204).end()

            }
        },
        {
            method: 'PATCH',
            path: buildRoutePath('/tasks/:id/complete'),
            handler: (req, res) => {

                const {id} = req.params
                
                database.updateComplete('tasks', id,  new Date().toLocaleDateString())

                return res.writeHead(204).end()

            }
        },

    ]
