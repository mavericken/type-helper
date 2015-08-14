
{
    //for tricking intellisense into letting us get better intellisense
    //currently broken...

    var intellisenseOnly;
    function testForIntellisense(theValue) {
        /// <param name="theValue" value="false">
        return theValue;
    }  
    
    intellisenseOnly = testForIntellisense(false);
    
    module.exports = intellisenseOnly;

}
