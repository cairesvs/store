import * as elasticsearch from 'elasticsearch';
import * as config from 'config';

export class Search {
    static client: elasticsearch.Client;

    static create(): void {
        if (!this.client) {
            this.client = new elasticsearch.Client({
                host: config.get('Elasticsearch.host'),
                log: config.get('Elasticsearch.log')
            })
        }
    }

    static getConnection(): elasticsearch.Client {
        if (!this.client) {
            Search.create();
        }
        return this.client;
    }
} 