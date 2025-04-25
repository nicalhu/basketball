// 初始数据
const initialData = {
    teams: {
        "点火大队": {
            name: "点火大队",
            group: "A",
            captain: "二哥",
            players: {
                A: "二哥",
                B: "阿海",
                C: "肖政",
                D: "老师"
            }
        },
        "钓鱼队": {
            name: "钓鱼队",
            group: "A",
            captain: "李磊",
            players: {
                A: "健身教练",
                B: "小蔡",
                C: "裁判",
                D: "刘队"
            }
        },
        "激情队": {
            name: "激情队",
            group: "A",
            captain: "陈总",
            players: {
                A: "胡杰",
                B: "医生",
                C: "老鼠",
                D: "陈总"
            }
        },
        "辉煌队": {
            name: "辉煌队",
            group: "A",
            captain: "老崔",
            players: {
                A: "余智伟",
                B: "阿辉",
                C: "大白",
                D: "老崔"
            }
        },
        "杰克队": {
            name: "杰克队",
            group: "A",
            captain: "阿基",
            players: {
                A: "杰克",
                B: "基哥",
                C: "王圆圆",
                D: "黄桂全"
            }
        },
        "鹏峰队": {
            name: "鹏峰队",
            group: "A",
            captain: "阿联",
            players: {
                A: "阿联",
                B: "阿德",
                C: "眼镜王",
                D: "阿亮"
            }
        },
        "野百合": {
            name: "野百合",
            group: "B",
            captain: "阿才",
            players: {
                A: "阿才",
                B: "阿钟",
                C: "小杨",
                D: "毛人"
            }
        },
        "保罗队": {
            name: "保罗队",
            group: "B",
            captain: "保罗",
            players: {
                A: "阿水",
                B: "保罗",
                C: "希驰",
                D: "小李"
            }
        },
        "峥峥岁月": {
            name: "峥峥岁月",
            group: "B",
            captain: "一哥",
            players: {
                A: "一哥",
                B: "独狼",
                C: "魏华",
                D: "曾总"
            }
        },
        "黑曼巴": {
            name: "黑曼巴",
            group: "B",
            captain: "小赖",
            players: {
                A: "小赖",
                B: "阿强",
                C: "张源飞",
                D: "老六"
            }
        },
        "无铭队": {
            name: "无铭队",
            group: "B",
            captain: "阿统",
            players: {
                A: "阿统",
                B: "小小赖",
                C: "阿峰",
                D: "眼镜"
            }
        },
        "向日葵": {
            name: "向日葵",
            group: "B",
            captain: "老梁",
            players: {
                A: "校长",
                B: "黄凌俊",
                C: "阿明",
                D: "老梁"
            }
        }
    },
    matches: [],
    standings: [],
    ads: [],
    knockout: {
        quarterFinals: [],
        semiFinals: [],
        final: null
    }
};

// 数据管理类
class DataManager {
    constructor() {
        this.loadData();
    }

    // 加载数据
    loadData() {
        const savedData = localStorage.getItem('basketballData');
        if (!savedData) {
            this.data = initialData;
            this.saveData();
        } else {
            this.data = JSON.parse(savedData);
            // 确保所有必要的属性都存在
            if (!this.data.knockout) {
                this.data.knockout = {
                    quarterFinals: [],
                    semiFinals: [],
                    final: null
                };
            }
            if (!Array.isArray(this.data.standings)) {
                this.data.standings = [];
            }
        }
    }

    // 保存数据
    saveData() {
        localStorage.setItem('basketballData', JSON.stringify(this.data));
    }

    // 获取所有球队
    getAllTeams() {
        return this.data.teams;
    }

    // 获取指定分组的球队
    getTeamsByGroup(group) {
        const teams = this.data.teams;
        return Object.values(teams).filter(team => team.group === group);
    }

    // 获取球队详情
    getTeamDetails(teamName) {
        return this.data.teams[teamName];
    }

    // 添加或更新球队
    updateTeam(teamData) {
        this.data.teams[teamData.name] = teamData;
        this.saveData();
    }

    // 删除球队
    deleteTeam(teamName) {
        delete this.data.teams[teamName];
        this.saveData();
    }

    // 添加比赛
    addMatch(matchData) {
        this.data.matches.push(matchData);
        this.saveData();
    }

    // 更新比赛
    updateMatch(index, matchData) {
        this.data.matches[index] = matchData;
        this.saveData();
    }

    // 获取所有比赛
    getAllMatches() {
        return this.data.matches;
    }

    // 更新排行榜
    updateStandings(standings) {
        this.data.standings = standings;
        this.saveData();
    }

    // 获取排行榜
    getStandings() {
        return this.data.standings;
    }

    // 初始化默认排行榜数据
    initializeDefaultStandings() {
        const teams = this.getAllTeams();
        const standings = Object.values(teams).map(team => ({
            team: team.name,
            group: team.group,
            played: 0,
            won: 0,
            lost: 0,
            pointsFor: 0,
            pointsAgainst: 0,
            points: 0
        }));
        this.updateStandings(standings);
        return standings;
    }

    // 添加广告
    addAd(adData) {
        this.data.ads.push(adData);
        this.saveData();
    }

    // 更新广告
    updateAd(index, adData) {
        this.data.ads[index] = adData;
        this.saveData();
    }

    // 删除广告
    deleteAd(index) {
        this.data.ads.splice(index, 1);
        this.saveData();
    }

    // 获取所有广告
    getAllAds() {
        return this.data.ads;
    }

    // 获取淘汰赛数据
    getKnockout() {
        return this.data.knockout;
    }

    // 更新淘汰赛数据
    updateKnockout(knockoutData) {
        this.data.knockout = knockoutData;
        this.saveData();
    }
}

// 创建全局数据管理实例
const dataManager = new DataManager(); 