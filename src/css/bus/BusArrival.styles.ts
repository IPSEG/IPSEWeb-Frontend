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
    font-size: 11px;
    font-weight: bold;
    color: #555;
    margin: 0;
`;

export const BusStopName = styled.p`
    font-size: 12px;
    font-weight: bold;
    color: #222;
    margin: 0;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #E0E0E0;
`;

//
export const BusListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* 아이템 간 간격 */
  padding: 15px;
`;

export const BusInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f8f8;
    padding: 10px 15px;
    border-radius: 8px;
    border: 1px solid #ddd;
`;

export const BusNumber = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #2d6a4f; /* 초록색 계열 */
`;

export const RegionTag = styled.span`
  font-size: 14px;
  color: #666;
  margin-left: 5px;
`;

export const BusTypeTag = styled.span<{ isExpress: boolean }>`
    background-color: ${(props) => (props.isExpress ? "#ff4d4d" : "#ffcc00")};
    /* 급행이면 빨간색(#ff4d4d), 아니면 노란색(#ffcc00) */
    color: #fff; /* 흰색 글씨 */
    font-size: 12px;
    font-weight: bold;
    padding: 3px 6px;
    border-radius: 8px;
    margin-left: 6px; /* RegionTag와 간격 조정 */
    display: inline-block;
    min-width: 40px;
    text-align: center;
`;

export const RouteInfo = styled.div`
  font-size: 14px;
  color: #444;
`;

export const ArrivalInfo = styled.div`
  font-size: 14px;
  color: #999;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  margin-right: 10px;
`;
