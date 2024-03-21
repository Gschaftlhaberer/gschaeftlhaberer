import { writable } from 'svelte/store';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);

export type DocumentId = string;
export type RevisionId = string;
export interface IdMeta {
	_id: DocumentId;
}
export interface RevisionIdMeta {
	_rev: RevisionId;
}
export type NewDocument<Content extends object> = Content;
export type Document<Content extends object> = Content & IdMeta;
export type ExistingDocument<Content extends object> = Document<Content> & RevisionIdMeta;

export interface Item {
	type: string;
	version: string;
}

export interface ProductList extends Item {
	name: string;
}

export const db = writable(new PouchDB<ProductList>('shopping'));
