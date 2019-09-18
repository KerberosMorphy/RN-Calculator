#include <jni.h>

/**
 * les type doivent toujours débuter par j [@link : https://docs.oracle.com/javase/7/docs/technotes/guides/jni/spec/types.html]
 * les nom de méthode doivent toujours être de la forme : Java_package_name_ModuleName_functionNameJNI
 * les méthode doivent obligatoirement inclure les arguments : (JNIEnv* env, jobject thiz, yourArgument...)
 */
jstring Java_com_reactlibrary_RNJavaCalculatorModule_helloWorldJNI(JNIEnv* env, jobject thiz) {
  return (*env)->NewStringUTF(env, "Hello World!");
}