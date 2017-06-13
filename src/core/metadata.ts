import { Decorator, HapinessModule, Injectable, Route, Lib, Lifecycle } from '../core_bis';
import * as Boom from 'boom';
import * as Debug from 'debug';
const debug = Debug('hapiness:metadata');

/**
 * Helper to extract Metadata
 * from a decorator
 *
 * @todo Filter with the right type
 * @param  {any} type
 * @returns Decorator
 */
export function extractMetadata(type: any): Decorator {
    return extractMetadatas(type)
        .pop();
};

/**
 * Helper to extract Metadata
 * with the decorator name provided
 *
 * @param  {any} type
 * @param  {string} name
 */
export function extractMetadataByDecorator<T>(type: any, name: string): T {
    return extractMetadatas(type)
        .filter(x => x.toString().slice(1) === name)
        .map(x => <T>x)
        .pop();
}

/**
 * Helper to extract Metadata
 * from a decorator
 *
 * @todo Filter with the right type
 * @param  {any} decorator
 * @returns []
 */
export function extractMetadatas(decorator: any): any[] {
    return Reflect.getOwnMetadataKeys(decorator)
        .filter(x => x === 'annotations')
        .map(x => <any[]>Reflect.getOwnMetadata(x, decorator))
        .map(x => [].concat(x))
        .pop() || [];
};
