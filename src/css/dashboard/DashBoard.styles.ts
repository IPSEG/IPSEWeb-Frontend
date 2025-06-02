import styled from "styled-components";



export const DashBoardWrapper = styled.div.attrs({
    className: 'p-4 max-w-md mx-auto'
})``;

export const CardBox = styled.div.attrs({
    className: `flex items-center justify-between border rounded-xl p-4 mb-3 hover:bg-gray-50 cursor-pointer`
})``;

export const Emoji = styled.div.attrs({
    className: 'text-2xl'
})``;

export const TextGroup = styled.div.attrs({
    className: 'flex items-start space-x-3'
})``;

export const DashBoardTitle = styled.div.attrs({
    className: 'font-semibold text-base'
})``;

export const DashBoardDescription = styled.div.attrs({
    className: 'text-sm text-gray-500'
})``;

export const RightArrow = styled.div.attrs({
    className: 'text-gray-400 text-lg'
})``;

export const AddCardBox = styled.div.attrs({
    className: 'border rounded-xl p-4 text-center text-lg font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer'
})``;

export const CardGroupTitle = styled.div.attrs({ className: 'text-lg font-bold mb-2 mt-6 flex items-center gap-1' })``;