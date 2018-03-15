import React from 'react';

const Rules = () => (
	<div className="rules">
		<ol>
			<li>
				Points are awarded only for those stages which you take a part. The
				application compares two tables - the ten pilots you specified in the
				forecast, and the top ten pilots as actual result of the race. The
				results of pilots who finish outside the top ten do not count.
			</li>
			<li>
				If the pilot finished at the position you indicated in the forecast, you
				get 25 points. If you make a mistake on one position - 18 points, two
				positions - 15 points, three - 12 points, four - 10 points, five - 8
				points , six - 6 points, seven - 4 points, eight - 2 points and nine - 1
				point. Points are summed up.
			</li>
			<li>
				The winner is identified by the five best predictions made during the
				whole season. Even if you join the competition for five Grand prix
				before the end of the championship, you have a chance to win the main
				prize.
			</li>
		</ol>
	</div>
);

export default Rules;
