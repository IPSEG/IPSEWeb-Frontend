
export interface IForm {
    busStopNameOrId: string
}


export interface IBusStopList {
    bus_stop_id: string,
    bus_stop_name: string,
    city_code: string,
    city: string,
    detail_city: string
}


export interface IBusStopPageData {
    bus_stop_list: IBusStopList[],
    has_next: boolean,
    has_previous: boolean,
    page_count: number,
    current_page_number: number;
}



export interface BusArrivalData {
    bus_stop_id: string;
    bus_stop_name: string;
    route_type : string;
    vehicle_type : string;
    arrive_prev_station_cnt : number;
    arrive_seconds : number;
    route_id : string;
    route_no : number;
}

export interface BusRouteBasicInfo {
    end_node_name : string;
    start_node_name : string;
    end_vehicle_name : string;
    start_vehicle_time : string;
    interval_saturday_time_minute : number;
    interval_sunday_time_minute : number;
    interval_time_minute : number;
    route_id : string;
    route_no : number;
    route_type : string;
}