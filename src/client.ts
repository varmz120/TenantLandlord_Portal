import { createClient } from '../esc-backend/src/client';
import rest from '@feathersjs/rest-client';
import axios from 'axios';

// Fixed
export const client = createClient(rest('http://localhost:3030').axios(axios));