import { Transform, pipeline } from "node:stream";
import { open } from "node:fs/promises";

class Encrypt extends Transform {
    completed: number = 0;
    chunckSize: number = 0;
    totalFileSize: number = 0;

    constructor(fileSizeInBytes: number) {
        super();
        this.totalFileSize = fileSizeInBytes;
    }

    _transform(chunk: Buffer, encoding: BufferEncoding, callback: (err ? : Error | null, data ? : any) => void): void {
        for (let i = 0; i < chunk.length; i++) {
            const readIntBuffer = chunk.readInt8(i);
            chunk.writeInt8(readIntBuffer + 1, i);
        }
        callback(null, chunk);
        this.chunckSize += chunk.length;
        this.completedPercentage();
    }

    completedPercentage(): void {
        const percentCompleted = ((this.chunckSize / this.totalFileSize) * 100).toFixed(2);
        console.log(`Loading... ${percentCompleted}%`);
    }
}

class Decrypt extends Transform {
    _transform(chunk: Buffer, encoding: BufferEncoding, callback: (err: Error | null, data ? : any) => void): void {
        for (let i = 0; i < chunk.length; i++) {
            const readIntBuffer = chunk.readInt8(i);
            chunk.writeInt8(readIntBuffer - 1, i);
        }
        callback(null, chunk);
    }
}

async function encode() {
    try {
        const [readerFileHandler, writerFileHandler] = await Promise.all([
            open("to_know.txt", "r"),
            open("encrypt.txt", "w")
        ]);

        const fileSize = (await readerFileHandler.stat()).size;

        const encrypt = new Encrypt(fileSize);

        const readStream = readerFileHandler.createReadStream();
        const writeStream = writerFileHandler.createWriteStream();

        pipeline(
            readStream,
            encrypt,
            writeStream,
            (err) => {
                if (err) {
                    throw new Error(err.message);
                }
            }
        )

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

async function decode() {
    try {
        const decrypt = new Decrypt();

        const [readerFileHandler, writerFileHandler] = await Promise.all([
            open("encrypt.txt", "r"),
            open("decrypt.txt", "w")
        ]);

        const readStream = readerFileHandler.createReadStream();
        const writeStream = writerFileHandler.createWriteStream();

        pipeline(
            readStream,
            decrypt,
            writeStream,
            (err) => {
                if (err) {
                    throw new Error(err.message);
                }
                console.log("finish")
            });

    } catch (err) {
        console.log(err);
        console.log("ERROR")
        process.exit(1);
    }
}

// encode()
decode()