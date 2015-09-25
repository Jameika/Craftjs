/**
 * Example version to the Fractional Knapsack problem. Also shows off some probably less-than-stellar uses of iterative variable creation in Craftjs
 * This currently generates a base solution. To get an closer-to-optimal one, several iterations of the problem should be run, increasing a minimum 
 * threshold value over a certain number of runs to get a good approximation of the optimal solution.
 * This require config statement points to the location of all the modules of Craftjs.
 */

require.config({
    paths : {
        'inheritance' : '../js/vendor/inheritance',
        'boundingBox' : '../js/modules/boundingBox',
        'csp' : '../js/modules/csp',
        'constraint' : '../js/modules/constraint',
        'floatVariable' : '../js/modules/floatVariable',
        'interval' : '../js/modules/interval',
        'mathUtil' : '../js/modules/mathUtil',
        'memoTable' : '../js/modules/memoTable',
        'restorable' : '../js/modules/restorable',
        'scalarArithmaticConstraints' : '../js/modules/scalarArithmaticConstraints',
        'searchHint' : '../js/modules/searchHint',
        'undoStack' : '../js/modules/undoStack',
        'variable' : '../js/modules/variable',
        'dictionary' : '../js/shared/dictionary'
    }
});

/**
 *  Now for the actual program.  The only two modules needed to use Craftjs are
 *  csp and floatVariable.
 */
require(["csp", "floatVariable"], function(CSP, FloatVariable){'use strict';
    var canvas = document.getElementById("demoCanvas");
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;

    var p = new CSP();
    var amounts = [];
    /** Problem Parameters **/
    var weights = [5,2,1];
    var price = [25,25,25];
    var totalWeight = 8;
    
    var weight;
    var totalPrice;
    for (var i = 0; i < weights.length; i++)
    {
    	amounts.push(FloatVariable.makeFloatVariableWithBounds("a" + i.toString(), p, 0, 1));
    	if (i == 1)
    	{
    		weight = FloatVariable.add(FloatVariable.multiplyIntervalByConstant(amounts[0],weights[0]), FloatVariable.multiplyIntervalByConstant(amounts[1],weights[1]));
    		totalPrice = FloatVariable.add(FloatVariable.multiplyIntervalByConstant(amounts[0],price[0]), FloatVariable.multiplyIntervalByConstant(amounts[1],price[1]));
    	}
    	if (i > 1)
    	{
    		weight = FloatVariable.add(weight, FloatVariable.multiplyIntervalByConstant(amounts[i],weights[i]));
    		totalPrice = FloatVariable.add(weight, FloatVariable.multiplyIntervalByConstant(amounts[i],price[i]));
    	}
    }

    weight.mustEqual(totalWeight);
    p.newSolution();
    for (var i = 0; i < amounts.length; i++)
    {
    	console.log(amounts[i].uniqueValue());
    }

});
