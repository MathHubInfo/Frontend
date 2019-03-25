/**
 * @license
 * Adapted from:  
 *
 * MIT License
 * 
 *     Copyright (c) Microsoft Corporation. All rights reserved.
 * 
 *     Permission is hereby granted, free of charge, to any person obtaining a copy
 *     of this software and associated documentation files (the "Software"), to deal
 *     in the Software without restriction, including without limitation the rights
 *     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *     copies of the Software, and to permit persons to whom the Software is
 *     furnished to do so, subject to the following conditions:
 * 
 *     The above copyright notice and this permission notice shall be included in all
 *     copies or substantial portions of the Software.
 * 
 *     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *     SOFTWARE
 * 
 */
declare module "git-rev-sync" {
    export function short(filePath?: string, length?: number): string;
    export function long(filePath?: string): string;
    export function branch(filePath?: string): string;
    export function count(): number;
    export function date(): Date;
    export function isDirty(): boolean;
    export function isTagDirty(): boolean;
    export function message(): string;
    export function remoteUrl(): string;
    export function tag(makeDirty?: boolean): string;
}
