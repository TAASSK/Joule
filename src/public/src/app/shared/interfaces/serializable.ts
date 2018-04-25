export interface Serializable<T> {
	deserialize(input: object): T
	serialize(input: T): string
}
