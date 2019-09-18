using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Java.Calculator.RNJavaCalculator
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNJavaCalculatorModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNJavaCalculatorModule"/>.
        /// </summary>
        internal RNJavaCalculatorModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNJavaCalculator";
            }
        }
    }
}
