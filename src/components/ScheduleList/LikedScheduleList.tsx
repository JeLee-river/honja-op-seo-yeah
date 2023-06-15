import React, { useCallback, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styles from './ScheduleList.module.scss';
import ScheduleCard from '../ScheduleCard/ScheduleCard';
import { ScheduleCardType, ScheduleListType } from '../../types/ScheduleTypes';
import { useAuthState } from '../../contexts/AuthContext';
import AlertModal from '../common/Alert/AlertModal';
import images from '../../constants/image';
import tokenInstance from '../../apis/tokenInstance';
import { FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Router from '../../constants/Router';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function LikesScheduleLists() {
  const { authState } = useAuthState();
  const isLoggedIn = authState.isLoggedIn;
  const [showScheduleList, setShowScheduleList] = useState<ScheduleListType>(
    []
  );
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const lastElement = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await tokenInstance.get(
        `${baseUrl}/users/me/liked-schedules`
      );
      const scheduleData = response.data;
      setShowScheduleList(scheduleData);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setShowAlertModal(true);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleOnConfirm() {
    setShowAlertModal(false);
  }

  return (
    <>
      <div className={styles.imageContainer}>
        <img
          src={images[3]}
          alt='일정 메인 이미지'
          className={styles.scheduleListImage}
        />
        <div className={styles.scheduleListTitle}>
          <h1>여행 일정</h1>
          <h2>마음에 드는 일정을 찾아보세요</h2>
        </div>
      </div>
      <div className={styles.scheduleContainer}>
        <div className={styles.scheduleFilter}>
          <Link
            to={`${Router.SCHEDULE_LIST}/likes`}
            className={styles.sortButton}
          >
            인기순
          </Link>
          <Link
            to={`${Router.SCHEDULE_LIST}/recent`}
            className={styles.sortButton}
          >
            최신순
          </Link>
          {isLoggedIn && (
            <Link
              to={`${Router.SCHEDULE_LIST}/liked`}
              className={`${styles.sortButton} ${styles.selected}`}
            >
              좋아요 한 일정
            </Link>
          )}
        </div>
        {showAlertModal && (
          <AlertModal
            message='여행 일정을 불러올 수 없습니다.'
            onConfirm={handleOnConfirm}
          />
        )}
        <div className={styles.scheduleCardContainer}>
          {showScheduleList.length ? (
            showScheduleList.map(
              (schedule: ScheduleCardType, index: number) => (
                <ScheduleCard schedule={schedule} key={index} />
              )
            )
          ) : (
            <div className={styles.noSchedule}>
              <FaExclamationCircle />
              <div>좋아요 한 일정이 없습니다</div>
            </div>
          )}
        </div>
      </div>
      <div ref={lastElement} className={styles.lastElement}></div>
    </>
  );
}

export default LikesScheduleLists;
