import styled from "styled-components";
import {Link} from "react-router-dom";

export const StyledLink = styled(Link)`
    text-decoration: none;  // 밑줄 제거
    color: inherit;  // 부모 색상 상속
`;

export const Wrapper = styled.div`
    background-color: ${(props) => props.theme.boardColor};
    padding-top: 10px;
    border-radius: 5px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
`;

export const BusStopInfo = styled.div`
    padding: 10px;
    border-bottom: 1px solid #ddd;

    a {
        text-decoration: none;  // 🚀 링크 밑줄 제거
        color: inherit;  // 부모의 텍스트 색상으로 사용
        display: block;  // 전체 영역을 클릭할 수 있도록
    }
    //
    // &:hover {
    //     a {
    //         color: ${(props) => props.theme.accentColor};  // hover 시 색상 변경
    //     }
    // }
`;

export const BusStopBottomRow = styled.div`
    font-size: 20px;
    color: #666;
    margin-top: 5px;
`;


export const BusStopTopRow = styled.div`
    display: flex;
    align-items: center;

`;

export const BusStopName = styled.a`
    color: #3182f6;
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
`;


export const BusStopLocation = styled.div`
    font-size: 18px;
    font-weight: bold;
    padding: 12px 25px;
    background-color: #F3F4F8;
    color: #7A828D;
`;