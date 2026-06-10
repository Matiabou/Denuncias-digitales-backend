import CnxMongoDB from '../DBMongo.js'
import { ObjectId } from 'mongodb'

class UsuariosMongoDB {

    collection = null

    constructor() {
        this.collection = CnxMongoDB.db.collection('usuarios')
    }

    async obtenerUsuarios() {
        return await this.collection.find().toArray()
    }

    async obtenerUsuario(id) {
        return await this.collection.findOne({_id: new ObjectId(id)})
    }

    async guardarUsuario(usuario) {
        const r = await this.collection.insertOne(usuario)
        return {...usuario, _id: r.insertedId}
    }

    async actualizarUsuario(id, usuario) {
        await this.collection.updateOne(
                {
                    _id: new ObjectId(id)
                },
                {
                    $set: usuario
                }
            )
        return usuario
    }

    async borrarUsuario(id) {
        return await this.collection.deleteOne({_id: new ObjectId(id)})
    }

}

export default UsuariosMongoDB