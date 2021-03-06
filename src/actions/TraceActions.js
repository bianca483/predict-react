import {createPayloadForwardingAction} from './index';

export const TRACE_LIST_REQUESTED = 'TRACE_LIST_REQUESTED';
export const traceListRequested = createPayloadForwardingAction(TRACE_LIST_REQUESTED);

export const TRACE_LIST_RETRIEVED = 'TRACE_LIST_RETRIEVED';
export const traceListRetrieved = createPayloadForwardingAction(TRACE_LIST_RETRIEVED);

export const TRACE_LIST_FAILED = 'TRACE_LIST_FAILED';
export const traceListFailed = createPayloadForwardingAction(TRACE_LIST_FAILED);

export const TRACE_UPDATED = 'TRACE_UPDATED';
export const TRACE_COMPLETED = 'TRACE_COMPLETED';
