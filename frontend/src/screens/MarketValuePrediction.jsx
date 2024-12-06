import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import players from '../players';
import { RadialChart } from 'react-vis';
// eslint-disable-next-line
import Plot from 'react-plotly.js';
import { gsap } from 'gsap';

const MarketValuePrediction = () => {
    const { playerId } = useParams();
    const player = players.find((p) => p._id === playerId);

    const [animateChart, setAnimateChart] = useState(false);
    const [predictedValue, setPredictedValue] = useState(0); // Animated value state
    const predictedValueRef = useRef(); // GSAP target ref
    const finalPredictedValue = 75_000_000; // Example: €75,000,000

    useEffect(() => {
        // Simulate an animation delay
        const timer = setTimeout(() => setAnimateChart(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (predictedValueRef.current) {
            // Animate the counter using GSAP
            gsap.to(predictedValueRef.current, {
                innerText: finalPredictedValue,
                duration: 2,
                ease: 'power1.out',
                snap: { innerText: 1 },
                onUpdate: function () {
                    setPredictedValue(Number(predictedValueRef.current.innerText));
                },
            });
        }
    }, [finalPredictedValue]);

    if (!player) {
        return (
            <div className="error-message">
                <h2>Player Not Found</h2>
                <p>Sorry, we couldn't find the player you're looking for.</p>
            </div>
        );
    }

    // Dummy data for career progression radial chart
    const careerProgressionData = [
        { angle: 30, label: '2018' },
        { angle: 40, label: '2019' },
        { angle: 50, label: '2020' },
        { angle: 70, label: '2021' },
        { angle: 100, label: '2022' },
    ];

    // Dummy data for 3D market value progression
    const marketValueData = {
        x: ['2018', '2019', '2020', '2021', '2022'],
        y: [25, 35, 45, 60, 75],
        z: [10, 20, 30, 40, 50], // e.g., goals scored
    };

    return (
        <div className="prediction-page">
            <h1 className="page-title">Market Value Prediction</h1>

            <div className="player-container">
                <div className="player-info black-box">
                    <img className="player-image" src={player.image} alt={player.name} />
                    <div className="player-details">
                        <h2>{player.name}</h2>
                        <p><strong>Age:</strong> {player.age}</p>
                        <p><strong>Nationality:</strong> {player.nationality}</p>
                        <p><strong>Club:</strong> {player.club}</p>
                        <p><strong>Market Value:</strong> €{player.value_euro}</p>
                        <p><strong>Wage:</strong> €{player.wage_euro}</p>
                    </div>
                </div>

                <div className="charts">
                    <h3>Career Progression (Radial)</h3>
                    {animateChart && (
                        <RadialChart
                            data={careerProgressionData}
                            width={300}
                            height={300}
                            showLabels
                            labelsStyle={{
                                fontSize: 12,
                                fill: '#fff',
                            }}
                            animation
                        />
                    )}
                </div>

                <div className="charts">
                    <h3>Market Value Over Time (3D)</h3>
                    <p className="graph-description">
                        This 3D graph shows the player's market value progression over time, with each year
                        represented on the X-axis. The Y-axis represents the player's market value in millions of euros (€M),
                        while the Z-axis shows the number of goals scored during each respective year. The graph's
                        markers represent data points for each year, with the lines connecting these points showing the 
                        overall trend in market value and performance over time.
                    </p>
                    <Plot
                        data={[
                            {
                                x: marketValueData.x,
                                y: marketValueData.y,
                                z: marketValueData.z,
                                type: 'scatter3d',
                                mode: 'lines+markers',
                                marker: {
                                    color: 'blue',
                                    size: 10, // Increased size for better visibility
                                },
                                line: {
                                    color: 'blue',
                                    width: 2,
                                },
                            },
                        ]}
                        layout={{
                            margin: { t: 0 },
                            scene: {
                                xaxis: {
                                    title: 'Year',
                                    tickvals: marketValueData.x,
                                    ticktext: ['2018', '2019', '2020', '2021', '2022'],
                                },
                                yaxis: {
                                    title: 'Market Value (€M)',
                                    tickvals: [25, 35, 45, 60, 75],
                                    ticktext: ['€25M', '€35M', '€45M', '€60M', '€75M'],
                                },
                                zaxis: {
                                    title: 'Goals Scored',
                                    tickvals: [10, 20, 30, 40, 50],
                                    ticktext: ['10', '20', '30', '40', '50'],
                                },
                            },
                            height: 400,
                            autosize: true,
                            hovermode: 'closest',
                        }}
                    />
                </div>
            </div>

            <div className="ml-prediction">
                <h3>Market Value Predicted by ML Model</h3>
                <p className="predicted-value">
                    €<span ref={predictedValueRef}>{predictedValue}</span>
                </p>
                <div className="context-stats">
                    <p>Goals: 15</p>
                    <p>Assists: 10</p>
                    <p>Trophies: 3</p>
                </div>
            </div>
        </div>
    );
};

export default MarketValuePrediction;
