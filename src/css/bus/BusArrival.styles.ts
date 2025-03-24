import styled from "styled-components";

export const Title = styled.h1`
    font-size: 48px;
    text-align: center;
    color: ${props => props.theme.accentColor};
`;

export const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;


export const BusStopContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 16px;
    font-family: "Arial", sans-serif;
`;


export const BusStopIdAndNameContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
`;

export const BusStopId = styled.p`
    font-size: 14px;
    font-weight: bold;
    color: #555;
    margin-right: 4px;
`;

export const BusStopName = styled.p`
    font-size: 14px;
    font-weight: bold;
    color: #222;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #E0E0E0;
`;