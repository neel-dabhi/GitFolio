import React, { useState, useEffect } from 'react';
import {GithubContext} from "../context/context";
import styled from "styled-components";

const GitHubCalendarGrid = () => {
    const {githubUser} = React.useContext(GithubContext); // Moved to top level
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch GitHub contributions data - moved useEffect to top level
    useEffect(() => {
        const fetchContributions = async () => {
            if (!githubUser) return;
            
            setLoading(true);
            setError(null);
            
            try {
                // Since we don't have a GitHub token, we'll use mock data
                // This provides a consistent experience without API rate limits
                setContributions([]); // Clear any previous data
                setError("Using mock contribution data for demonstration");
            } catch (err) {
                setError("Unable to load contributions. Using mock data.");
                setContributions([]); // Clear any previous data
            } finally {
                setLoading(false);
            }
        };

        fetchContributions();
    }, [githubUser]); // Dependency on githubUser

    // Generate mock contribution data for the last 365 days
    const generateMockContributions = () => {
        const mockData = [];
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 364); // Last 365 days

        // Find the start of the week (Sunday) for the start date
        const startOfWeek = new Date(startDate);
        const dayOfWeek = startOfWeek.getDay();
        startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);

        let currentDate = new Date(startOfWeek);
        let currentWeek = [];

        // Generate exactly 53 weeks (365 days + padding to complete weeks)
        for (let weekIndex = 0; weekIndex < 53; weekIndex++) {
            currentWeek = [];
            
            for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
                const contributionCount = Math.floor(Math.random() * 10); // Random 0-9 contributions
                currentWeek.push({
                    date: currentDate.toISOString().split('T')[0],
                    contributionCount: contributionCount,
                    weekday: dayIndex
                });
                currentDate.setDate(currentDate.getDate() + 1);
            }
            
            mockData.push(currentWeek);
        }

        return mockData;
    };

    // Use mock data if no contributions are available
    const calendarData = contributions.length > 0 ? contributions : generateMockContributions();

    // Get contribution color based on count - using GitHub's actual green palette
    const getContributionColor = (count) => {
        if (count === 0) return '#ebedf0';      // No contributions
        if (count <= 3) return '#9be9a8';       // 1-3 contributions
        if (count <= 6) return '#40c463';       // 4-6 contributions
        if (count <= 9) return '#30a14e';       // 7-9 contributions
        return '#216e39';                       // 10+ contributions
    };

    // Calculate contribution statistics
    const getContributionStats = () => {
        let total = 0;
        let activeDays = 0;
        let max = 0;

        calendarData.forEach(week => {
            week.forEach(day => {
                total += day.contributionCount;
                if (day.contributionCount > 0) activeDays++;
                if (day.contributionCount > max) max = day.contributionCount;
            });
        });

        return {
            total,
            activeDays,
            average: activeDays > 0 ? Math.round(total / activeDays) : 0,
            max
        };
    };

    const stats = getContributionStats();

    // Generate month labels - improved to show proper chronological order
    const getMonthLabels = () => {
        const months = [];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Find the first day of the calendar
        const firstDay = calendarData[0] && calendarData[0][0];
        if (!firstDay || !firstDay.date) return months;
        
        const startDate = new Date(firstDay.date);
        let currentMonth = startDate.getMonth();
        let currentYear = startDate.getFullYear();
        
        // Add the first month
        months.push({
            month: monthNames[currentMonth],
            weekIndex: 0
        });
        
        // Check each week for month changes
        calendarData.forEach((week, weekIndex) => {
            if (weekIndex === 0) return; // Skip first week as we already added it
            
            const weekStart = week[0];
            if (weekStart && weekStart.date) {
                const date = new Date(weekStart.date);
                const month = date.getMonth();
                const year = date.getFullYear();
                
                // Check if month changed (accounting for year changes)
                if (month !== currentMonth || year !== currentYear) {
                    months.push({
                        month: monthNames[month],
                        weekIndex: weekIndex
                    });
                    currentMonth = month;
                    currentYear = year;
                }
            }
        });
        
        return months;
    };

    const monthLabels = getMonthLabels();

    return (
        <section className="section">
            <Wrapper className="section-center">
                <CalendarCard>
                    <CalendarHeader>
                        <h3>GitHub Contributions</h3>
                        {loading && <LoadingText>Loading contributions...</LoadingText>}
                        {error && <ErrorText>{error}</ErrorText>}
                    </CalendarHeader>
                    
                    <StatsContainer>
                        <StatItem>
                            <StatValue>{stats.total}</StatValue>
                            <StatLabel>Total Contributions</StatLabel>
                        </StatItem>
                        <StatItem>
                            <StatValue>{stats.activeDays}</StatValue>
                            <StatLabel>Active Days</StatLabel>
                        </StatItem>
                        <StatItem>
                            <StatValue>{stats.average}</StatValue>
                            <StatLabel>Avg per Day</StatLabel>
                        </StatItem>
                        <StatItem>
                            <StatValue>{stats.max}</StatValue>
                            <StatLabel>Max in a Day</StatLabel>
                        </StatItem>
                    </StatsContainer>
                    
                    <CalendarWrapper>
                        <MonthLabels>
                            {monthLabels.map((label, index) => (
                                <MonthLabel 
                                    key={index}
                                    style={{ 
                                        left: `${(label.weekIndex / calendarData.length) * 100}%`,
                                        transform: 'translateX(-50%)'
                                    }}
                                >
                                    {label.month}
                                </MonthLabel>
                            ))}
                        </MonthLabels>
                        
                        <CalendarContainer>
                            {calendarData.map((week, weekIndex) => (
                                <Week key={weekIndex}>
                                    {week.map((day, dayIndex) => (
                                        <Day 
                                            key={dayIndex}
                                            color={getContributionColor(day.contributionCount)}
                                            title={`${day.date}: ${day.contributionCount} contributions`}
                                        />
                                    ))}
                                </Week>
                            ))}
                        </CalendarContainer>
                    </CalendarWrapper>
                    
                    <Legend>
                        <LegendItem>
                            <LegendBox color="#ebedf0" />
                            <span>Less</span>
                        </LegendItem>
                        <LegendItem>
                            <LegendBox color="#216e39" />
                            <span>More</span>
                        </LegendItem>
                    </Legend>
                </CalendarCard>
            </Wrapper>
        </section>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: var(--spacing-2xl);
    width: 100%;
`;

const CalendarCard = styled.div`
    background: var(--cardSurface);
    border: 1px solid var(--cardBorder);
    border-radius: var(--radius-lg);
    padding: var(--spacing-xl);
    box-shadow: var(--shadow-sm);
    transition: var(--transition-normal);
    width: 100%;

    &:hover {
        box-shadow: var(--shadow-md);
    }
`;

const CalendarHeader = styled.div`
    text-align: center;
    margin-bottom: var(--spacing-lg);

    h3 {
        color: var(--text-primary);
        margin-bottom: var(--spacing-sm);
        font-size: 1.5rem;
        font-weight: var(--font-weight-bold);
    }
`;

const LoadingText = styled.div`
    color: var(--accent);
    font-size: 0.875rem;
    font-weight: var(--font-weight-medium);
`;

const ErrorText = styled.div`
    color: var(--error);
    font-size: 0.875rem;
    font-weight: var(--font-weight-medium);
`;

const StatsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
    padding: var(--spacing-md);
    background: rgba(176, 124, 238, 0.05);
    border-radius: var(--radius-lg);
`;

const StatItem = styled.div`
    text-align: center;
`;

const StatValue = styled.div`
    color: var(--accent);
    font-size: 1.5rem;
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--spacing-xs);
`;

const StatLabel = styled.div`
    color: var(--text-secondary);
    font-size: 0.75rem;
    font-weight: var(--font-weight-medium);
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const CalendarWrapper = styled.div`
    position: relative;
    margin-bottom: var(--spacing-lg);
`;

const MonthLabels = styled.div`
    position: relative;
    height: 20px;
    margin-bottom: var(--spacing-sm);
`;

const MonthLabel = styled.div`
    position: absolute;
    color: var(--text-secondary);
    font-size: 0.75rem;
    font-weight: var(--font-weight-medium);
    white-space: nowrap;
`;

const CalendarContainer = styled.div`
    display: flex;
    gap: 2px;
    justify-content: center;
    padding: var(--spacing-sm) 0;
`;

const Week = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const Day = styled.div`
    width: 12px;
    height: 12px;
    background-color: ${props => props.color};
    border-radius: 2px;
    transition: var(--transition-fast);
    cursor: pointer;

    &:hover {
        transform: scale(1.2);
        box-shadow: var(--shadow-sm);
    }
`;

const Legend = styled.div`
    display: flex;
    justify-content: center;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-md);
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    color: var(--text-secondary);
    font-size: 0.75rem;
    font-weight: var(--font-weight-medium);
`;

const LegendBox = styled.div`
    width: 12px;
    height: 12px;
    background-color: ${props => props.color};
    border-radius: 2px;
`;

export default GitHubCalendarGrid;