import { DataSource, DataSourceOptions } from "typeorm"
import config from "../../ormconfig.json";

const dataSource = new DataSource(config as DataSourceOptions);

export default dataSource;
