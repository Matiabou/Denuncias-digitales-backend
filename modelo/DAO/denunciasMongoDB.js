import CnxMongoDB from '../DBMongo.js'
import { ObjectId } from 'mongodb'

class DenunciaMongoDB {

    collection = null

    constructor() {
        this.collection =
            CnxMongoDB.db.collection(
                'denuncias'
            )
    }

    async obtenerDenuncias() {
        return await this.collection
            .find()
            .toArray()
    }

    async obtenerDenuncia(id) {
        return await this.collection
            .findOne({
                _id:
                    new ObjectId(id)
            })
    }

    async guardarDenuncia(
        denuncia
    ) {

        const resultado =
            await this.collection
                .insertOne(denuncia)

        return {
            ...denuncia,
            _id: resultado.insertedId
        }
    }

    async actualizarDenuncia(
        id,
        denuncia
    ) {

        await this.collection
            .updateOne(
                {
                    _id:
                        new ObjectId(id)
                },
                {
                    $set:
                        denuncia
                }
            )

        return denuncia
    }

    async borrarDenuncia(
        id
    ) {

        return await this.collection
            .deleteOne({
                _id:
                    new ObjectId(id)
            })

    }

    async obtenerPorUsuario(usuarioId) {
        return await this.collection.find({
            usuarioId
        }).toArray()
    }

}

export default DenunciaMongoDB