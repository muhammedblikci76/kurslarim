import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useLayoutEffect } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { CoursesContext } from '../store/coursesContext';
import CourseForm from '../components/CourseForm';
import { storeCourse, updateCourse, deleteCourseHttp } from '../helper/http';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ManageCourse({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const coursesContext = useContext(CoursesContext);
  const courseId = route.params?.courseId;
  let isEditing = false;

  const selectedCourse = coursesContext.courses.find(
    (course) => course.id === courseId
  );

  if (courseId) {
    isEditing = true;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Kursu Güncelle' : 'Kurs Ekle',
    });
  }, [navigation, isEditing]);

  async function deleteCourse() {
    setIsSubmitting(true);
    coursesContext.deleteCourse(courseId);
    await deleteCourseHttp(courseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function addOrUpdateHandler(courseData) {
    setIsSubmitting(true);
    if (isEditing) {
      coursesContext.updateCourse(courseId, courseData);
      await updateCourse(courseId, courseData);
    } else {
      const id = await storeCourse(courseData);
      coursesContext.addCourse({ ...courseData, id: id });
    }
    navigation.goBack();
  }

  if (isSubmitting) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <CourseForm
        buttonLabel={isEditing ? 'Güncelle' : 'Ekle'}
        onSubmit={addOrUpdateHandler}
        cancelHandler={cancelHandler}
        defaultValues={selectedCourse}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <EvilIcons
            name="trash"
            size={36}
            color="black"
            onPress={deleteCourse}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  deleteContainer: {
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: 'blue',
    paddingTop: 10,
    marginTop: 16,
  },
});
