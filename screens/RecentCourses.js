import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Courses from '../components/Courses';
import { CoursesContext } from '../store/coursesContext';
import { getLastWeek } from '../helper/date';
import { useContext } from 'react';

export default function RecentCourses() {
  const coursesContext = useContext(CoursesContext);

  const recentCourses = coursesContext.courses.filter((course) => {
    const today = new Date();
    const dateLastWeek = getLastWeek(today, 7);

    return course.date >= dateLastWeek && course.date <= today;
  });

  return (
    <Courses
      courses={recentCourses}
      coursesPeriod="Son 1 Hafta"
      nullText="Yakın Zamanda herhangi bir kursa kaydolmadınız"
    />
  );
}

const styles = StyleSheet.create({});
