import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

function Home() {

    let timerId = null;

    const [state, setState] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        // Home이 언마운트가 되면!!
        return () => {
            if(timerId) {
                clearTimeout(timerId)
            }
        }
    }, [])

    const throttle = (delay) => {
        if (timerId) {
            // timerId가 있으면 바로 함수 종료
            return;
        }
        setState(!state);
        console.log(`API 요청 실행: ${delay}ms동안 추가 요청은 안 받습니다!`)
        timerId = setTimeout(() => {
            // 2초 뒤에 동작할 함수
            console.log(`${delay}ms 지남 추가요청 받습니다`)

            timerId = null;
        }, delay)
    }

    // 반복적인 이벤트 이후, delay가 지나면 function 작동
    const debounce = (delay) => {
        if (timerId) {
            // 할당되어 있는 timerId에 해당하는 타이머 제거
            clearTimeout(timerId)
        }
        // 2초 안에 다시 눌러 timerId가 삭제되어 밑의 함수 다시 실행
        timerId = setTimeout(() => {
            console.log(`마지막 요청으로부터 ${delay}ms가 지났으므로 API 요청 실행!`)
            timerId = null;
        }, delay)
    }

    return (
        <div style={{
            paddingLeft: 20,
            paddingRingt: 20,
        }}>
            <h1>button 이벤트 예제</h1>
            <button onClick={() => throttle(2000)}>쓰로틀링</button>   {/* 딜레이 2초 */}
            <button onClick={() => debounce(2000)}>디바운싱</button>

            <div>
                <button onClick={() => {
                    navigate('company');
                }}>페이지 이동</button>
            </div>
        </div>
    )
}

export default Home