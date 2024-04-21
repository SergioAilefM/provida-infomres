import { LocalStorageKeys } from '@storage/browser/types/LocalStorageKeys'

interface Storage {
    getItem(key: LocalStorageKeys): string | null
    setItem(key: string, value: string): void
    removeItem(key: string): void
}

export default class LocalStorage<T extends LocalStorageKeys> {
    private readonly storage: Storage

    public constructor(getStorage = (): Storage => window.sessionStorage) {
        this.storage = getStorage()
    }

    get(key: T): string | null {
        return this.storage.getItem(key)
    }

    set(key: T, value: string): void {
        this.storage.setItem(key, value)
    }

    clearItem(key: T): void {
        this.storage.removeItem(key)
    }

    clearItems(keys: T[]): void {
        keys.forEach(key => this.clearItem(key))
    }
}
