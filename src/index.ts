import { Services, InitOptions, ReadCallback, BackendModule } from "i18next";

interface BackendOptions {
    loadPath: string;
}

function getDefaults(): BackendOptions {
    return {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
    };
}

class Backend implements BackendModule {
    static type = "backend" as const;
    type = Backend.type;

    private services!: Services;
    private backendOptions!: BackendOptions;
    private i18nextOptions!: InitOptions;

    private resourceName!: string;

    init(services: Services, backendOptions: BackendOptions, i18nextOptions: InitOptions): void {
        this.services = services;
        this.backendOptions = {
            ...getDefaults(),
            ...backendOptions,
        };
        this.i18nextOptions = i18nextOptions;

        this.resourceName = GetInvokingResource();
    }

    read(language: string, namespace: string, callback: ReadCallback): void {
        const interpolatedPath = this.services.interpolator.interpolate(
            this.backendOptions.loadPath,
            {
                lng: language,
                ns: namespace,
            },
            "dev",
            {}
        );

        const resourceFile = LoadResourceFile(this.resourceName, interpolatedPath);
        if (!resourceFile) {
            return callback(
                `Failed loading resource file '${interpolatedPath}' from resource '${this.resourceName}': file is empty or does not exist`,
                null
            );
        }

        let data;

        try {
            data = JSON.parse(resourceFile);
        } catch (e: unknown) {
            const error = e as SyntaxError;
            return callback(
                `Error while parsing resource file '${interpolatedPath}' from resource '${this.resourceName}: ${error.message}`,
                null
            );
        }

        callback(null, data);
        this.services.logger.log(`Loaded resource file '${interpolatedPath}' from resource '${this.resourceName}'`);
    }
}

export default Backend;
