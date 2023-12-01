class PushBoxMap {
  static wallPosition = []; // 墙体
  static boxPosition = [];  // 箱子位置
  static finialPosition = []; // 终点位置
  static rolePosition = []; // 角色位置
  constructor(height = 20, width = 10) {  // 初始化函数，返回一个棋盘
    let map = [];
    this.height = height;
    this.width = width;
    for (let i = 0; i < height; i++) {
      map.push([]);
      for (let j = 0; j < width; j++) {
        map[i][j] = 'floor';  // 初始化所有的地方为0
      }
    };
    this.map = map;
  }
  // 获取点击元素的数组坐标
  getPosition(element, position, style) {
    let _this = this;
    element.onclick = (e) => {
      let id = e.srcElement.id - 1; // 箱子位置
      let x = Math.floor(id / _this.width);  // x坐标
      let y = id % _this.width;  // y坐标
      position.push([x, y]);
      _this.map[x][y] += ' ' + style;
      e.srcElement.getAttributeNode('class').value += ' ' + style;
    }
  }

  // 结束监听
  stopListen(element) {
    element.onclick = null;
  }

  // 获得随机1~4四个数，表示四个方向：1=>上，2=>右，3=>下,4=>左
  getRandom() {
    min = Math.ceil(1);
    max = Math.floor(4);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
  }

  // 开始游戏
  startGame(key, element) {
    let x = PushBoxMap.rolePosition[0][0];
    let y = PushBoxMap.rolePosition[0][1];
    let id = x * 10 + y;
    let _this = this;
    if (key === 'ArrowUp' || key === 'w') { // 上
      if (_this.map[x - 1][y].includes('wall')) {  // 前面是墙
        return;
      } else if (_this.map[x - 1][y].includes('box') && _this.map[x - 2][y].includes('box')) {  // 前面是箱子箱子前面还是箱子
        return;
      } else if (_this.map[x - 1][y].includes('box') && _this.map[x - 2][y].includes('wall')) {  // 前面是箱子，箱子前面是墙
        return;
      } else if (_this.map[x - 1][y].includes('box')) { // 前面是箱子
        if (_this.map[x - 1][y].includes('finial')) {  // 箱子下是终点
          if (_this.map[x][y].includes('finial')) {  // 玩家下面也是终点
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
            element.children[id - 10].getAttributeNode('class').value = _this.map[x - 1][y] = 'miniBox finial role';
            element.children[id - 20].getAttributeNode('class').value = _this.map[x - 2][y] = 'miniBox box';
          } else if (_this.map[x - 2][y].includes('finial')) {  // 箱子前面也是终点
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
            element.children[id - 10].getAttributeNode('class').value = _this.map[x - 1][y] = 'miniBox finial role';
            element.children[id - 20].getAttributeNode('class').value = _this.map[x - 2][y] = 'miniBox finial box';
          } else {  // 两边都不是终点
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
            element.children[id - 10].getAttributeNode('class').value = _this.map[x - 1][y] = 'miniBox finial role';
            element.children[id - 20].getAttributeNode('class').value = _this.map[x - 2][y] = 'miniBox box';
          }
        } else {  // 箱子下面不是终点
          if (_this.map[x][y].includes('finial') && _this.map[x - 2][y].includes('finial')) {  // 玩家下面和箱子前面是终点
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
            element.children[id - 10].getAttributeNode('class').value = _this.map[x - 1][y] = 'miniBox role';
            element.children[id - 20].getAttributeNode('class').value = _this.map[x - 2][y] = 'miniBox finial box';
          } else if (_this.map[x][y].includes('finial')) {  // 玩家下面是终点，箱子前面不是
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
            element.children[id - 10].getAttributeNode('class').value = _this.map[x - 1][y] = 'miniBox role';
            element.children[id - 20].getAttributeNode('class').value = _this.map[x - 2][y] = 'miniBox box';
          } else if (_this.map[x - 2][y].includes('finial')) {  // 玩家下面不是终点，箱子前面是
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
            element.children[id - 10].getAttributeNode('class').value = _this.map[x - 1][y] = 'miniBox role';
            element.children[id - 20].getAttributeNode('class').value = _this.map[x - 2][y] = 'miniBox finial box';
          } else {  // 都不是
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
            element.children[id - 10].getAttributeNode('class').value = _this.map[x - 1][y] = 'miniBox role';
            element.children[id - 20].getAttributeNode('class').value = _this.map[x - 2][y] = 'miniBox box';
          }
        }
        PushBoxMap.rolePosition[0] = [x - 1, y];  // 更新角色位置
        return;
      } else if (_this.map[x - 1][y].includes('finial')) {  // 前面是终点
        if (_this.map[x][y].includes('finial')) {  // 自己是终点
          element.children[id - 10].getAttributeNode('class').value = _this.map[x - 1][y] = 'miniBox finial role'; // 更新map
          element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
        } else {
          element.children[id - 10].getAttributeNode('class').value = _this.map[x - 1][y] = 'miniBox finial role';
          element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
        }
        PushBoxMap.rolePosition[0] = [x - 1, y];  // 更新角色位置
        return;
      } else if (_this.map[x - 1][y].includes('floor')) {  // 前面是空地
        if (_this.map[x][y].includes('finial')) {  // 自己是终点
          element.children[id - 10].getAttributeNode('class').value = _this.map[x - 1][y] = 'miniBox role'; // 更新map
          element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
        } else {  // 自己不是终点
          element.children[id - 10].getAttributeNode('class').value = _this.map[x - 1][y] = 'miniBox role';
          element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
        }
        PushBoxMap.rolePosition[0] = [x - 1, y];  // 更新角色位置
        return;
      }
    } else if (key === 'ArrowDown' || key === 's') {  // 下
      if (_this.map[x + 1][y].includes('wall')) {  // 前面是墙
        return;
      } else if (_this.map[x + 1][y].includes('box') && _this.map[x + 2][y].includes('box')) {  // 前面是箱子箱子前面还是箱子
        return;
      } else if (_this.map[x + 1][y].includes('box') && _this.map[x + 2][y].includes('wall')) {  // 前面是箱子，箱子前面是墙
        return;
      } else if (_this.map[x + 1][y].includes('box')) { // 前面是箱子
        if (_this.map[x + 1][y].includes('finial')) {  // 箱子下是终点
          if (_this.map[x][y].includes('finial')) {  // 玩家下面也是终点
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
            element.children[id + 10].getAttributeNode('class').value = _this.map[x + 1][y] = 'miniBox finial role';
            element.children[id + 20].getAttributeNode('class').value = _this.map[x + 2][y] = 'miniBox box';
          } else if (_this.map[x + 2][y].includes('finial')) {  // 箱子前面也是终点
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
            element.children[id + 10].getAttributeNode('class').value = _this.map[x + 1][y] = 'miniBox finial role';
            element.children[id + 20].getAttributeNode('class').value = _this.map[x + 2][y] = 'miniBox finial box';
          } else {  // 两边都不是终点
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
            element.children[id + 10].getAttributeNode('class').value = _this.map[x + 1][y] = 'miniBox finial role';
            element.children[id + 20].getAttributeNode('class').value = _this.map[x + 2][y] = 'miniBox box';
          }
        } else {  // 箱子下面不是终点
          if (_this.map[x][y].includes('finial') && _this.map[x + 2][y].includes('finial')) {  // 玩家下面和箱子前面是终点
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
            element.children[id + 10].getAttributeNode('class').value = _this.map[x + 1][y] = 'miniBox role';
            element.children[id + 20].getAttributeNode('class').value = _this.map[x + 2][y] = 'miniBox finial box';
          } else if (_this.map[x][y].includes('finial')) {  // 玩家下面是终点，箱子前面不是
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
            element.children[id + 10].getAttributeNode('class').value = _this.map[x + 1][y] = 'miniBox role';
            element.children[id + 20].getAttributeNode('class').value = _this.map[x + 2][y] = 'miniBox box';
          } else if (_this.map[x + 2][y].includes('finial')) {  // 玩家下面不是终点，箱子前面是
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
            element.children[id + 10].getAttributeNode('class').value = _this.map[x + 1][y] = 'miniBox role';
            element.children[id + 20].getAttributeNode('class').value = _this.map[x + 2][y] = 'miniBox finial box';
          } else {  // 都不是
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
            element.children[id + 10].getAttributeNode('class').value = _this.map[x + 1][y] = 'miniBox role';
            element.children[id + 20].getAttributeNode('class').value = _this.map[x + 2][y] = 'miniBox box';
          }
        }
        PushBoxMap.rolePosition[0] = [x + 1, y];  // 更新角色位置
        return;
      } else if (_this.map[x + 1][y].includes('finial')) {  // 前面是终点
        if (_this.map[x][y].includes('finial')) {  // 自己是终点
          element.children[id + 10].getAttributeNode('class').value = _this.map[x + 1][y] = 'miniBox finial role'; // 更新map
          element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
        } else {
          element.children[id + 10].getAttributeNode('class').value = _this.map[x + 1][y] = 'miniBox finial role';
          element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
        }
        PushBoxMap.rolePosition[0] = [x + 1, y];  // 更新角色位置
        return;
      } else if (_this.map[x + 1][y].includes('floor')) {  // 前面是空地
        if (_this.map[x][y].includes('finial')) {  // 自己是终点
          element.children[id + 10].getAttributeNode('class').value = _this.map[x + 1][y] = 'miniBox role'; // 更新map
          element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
        } else {  // 自己不是终点
          element.children[id + 10].getAttributeNode('class').value = _this.map[x + 1][y] = 'miniBox role';
          element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
        }
        PushBoxMap.rolePosition[0] = [x + 1, y];  // 更新角色位置
        return;
      }
    } else if (key === 'ArrowLeft' || key === 'a') {  // 左
      if (_this.map[x][y - 1].includes('wall')) {  // 前面是墙
        return;
      } else if (_this.map[x][y - 1].includes('box') && _this.map[x][y - 2].includes('box')) {  // 前面是箱子箱子前面还是箱子
        return;
      } else if (_this.map[x][y - 1].includes('box') && _this.map[x][y - 2].includes('wall')) {  // 前面是箱子，箱子前面是墙
        return;
      } else if (_this.map[x][y - 1].includes('box')) { // 前面是箱子
        if (_this.map[x][y - 1].includes('finial')) {  // 箱子下是终点
          if (_this.map[x][y].includes('finial')) {  // 玩家下面也是终点
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
            element.children[id - 1].getAttributeNode('class').value = _this.map[x][y - 1] = 'miniBox finial role';
            element.children[id - 2].getAttributeNode('class').value = _this.map[x][y - 2] = 'miniBox box';
          } else if (_this.map[x][y - 2].includes('finial')) {  // 箱子前面也是终点
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
            element.children[id - 1].getAttributeNode('class').value = _this.map[x][y - 1] = 'miniBox finial role';
            element.children[id - 2].getAttributeNode('class').value = _this.map[x][y - 2] = 'miniBox finial box';
          } else {  // 两边都不是终点
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
            element.children[id - 1].getAttributeNode('class').value = _this.map[x][y - 1] = 'miniBox finial role';
            element.children[id - 2].getAttributeNode('class').value = _this.map[x][y - 2] = 'miniBox box';
          }
        } else {  // 箱子下面不是终点
          if (_this.map[x][y].includes('finial') && _this.map[x][y - 2].includes('finial')) {  // 玩家下面和箱子前面是终点
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
            element.children[id - 1].getAttributeNode('class').value = _this.map[x][y - 1] = 'miniBox role';
            element.children[id - 2].getAttributeNode('class').value = _this.map[x][y - 2] = 'miniBox finial box';
          } else if (_this.map[x][y].includes('finial')) {  // 玩家下面是终点，箱子前面不是
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
            element.children[id - 1].getAttributeNode('class').value = _this.map[x][y - 1] = 'miniBox role';
            element.children[id - 2].getAttributeNode('class').value = _this.map[x][y - 2] = 'miniBox box';
          } else if (_this.map[x][y - 2].includes('finial')) {  // 玩家下面不是终点，箱子前面是
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
            element.children[id - 1].getAttributeNode('class').value = _this.map[x][y - 1] = 'miniBox role';
            element.children[id - 2].getAttributeNode('class').value = _this.map[x][y - 2] = 'miniBox finial box';
          } else {  // 都不是
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
            element.children[id - 1].getAttributeNode('class').value = _this.map[x][y - 1] = 'miniBox role';
            element.children[id - 2].getAttributeNode('class').value = _this.map[x][y - 2] = 'miniBox box';
          }
        }
        PushBoxMap.rolePosition[0] = [x, y - 1];  // 更新角色位置
        return;
      } else if (_this.map[x][y - 1].includes('finial')) {  // 前面是终点
        if (_this.map[x][y].includes('finial')) {  // 自己是终点
          element.children[id - 1].getAttributeNode('class').value = _this.map[x][y - 1] = 'miniBox finial role'; // 更新map
          element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
        } else {
          element.children[id - 1].getAttributeNode('class').value = _this.map[x][y - 1] = 'miniBox finial role';
          element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
        }
        PushBoxMap.rolePosition[0] = [x, y - 1];  // 更新角色位置
        return;
      } else if (_this.map[x][y - 1].includes('floor')) {  // 前面是空地
        if (_this.map[x][y].includes('finial')) {  // 自己是终点
          element.children[id - 1].getAttributeNode('class').value = _this.map[x][y - 1] = 'miniBox role'; // 更新map
          element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
        } else {  // 自己不是终点
          element.children[id - 1].getAttributeNode('class').value = _this.map[x][y - 1] = 'miniBox role';
          element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
        }
        PushBoxMap.rolePosition[0] = [x, y - 1];  // 更新角色位置
        return;
      }
    } else if (key === 'ArrowRight' || key === 'd') { // 右
      if (_this.map[x][y + 1].includes('wall')) {  // 前面是墙
        return;
      } else if (_this.map[x][y + 1].includes('box') && _this.map[x][y + 2].includes('box')) {  // 前面是箱子箱子前面还是箱子
        return;
      } else if (_this.map[x][y + 1].includes('box') && _this.map[x][y + 2].includes('wall')) {  // 前面是箱子，箱子前面是墙
        return;
      } else if (_this.map[x][y + 1].includes('box')) { // 前面是箱子
        if (_this.map[x][y + 1].includes('finial')) {  // 箱子下是终点
          if (_this.map[x][y].includes('finial')) {  // 玩家下面也是终点
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
            element.children[id + 1].getAttributeNode('class').value = _this.map[x][y + 1] = 'miniBox finial role';
            element.children[id + 2].getAttributeNode('class').value = _this.map[x][y + 2] = 'miniBox box';
          } else if (_this.map[x][y + 2].includes('finial')) {  // 箱子前面也是终点
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
            element.children[id + 1].getAttributeNode('class').value = _this.map[x][y + 1] = 'miniBox finial role';
            element.children[id + 2].getAttributeNode('class').value = _this.map[x][y + 2] = 'miniBox finial box';
          } else {  // 两边都不是终点
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
            element.children[id + 1].getAttributeNode('class').value = _this.map[x][y + 1] = 'miniBox finial role';
            element.children[id + 2].getAttributeNode('class').value = _this.map[x][y + 2] = 'miniBox box';
          }
        } else {  // 箱子下面不是终点
          if (_this.map[x][y].includes('finial') && _this.map[x][y + 2].includes('finial')) {  // 玩家下面和箱子前面是终点
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
            element.children[id + 1].getAttributeNode('class').value = _this.map[x][y + 1] = 'miniBox role';
            element.children[id + 2].getAttributeNode('class').value = _this.map[x][y + 2] = 'miniBox finial box';
          } else if (_this.map[x][y].includes('finial')) {  // 玩家下面是终点，箱子前面不是
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
            element.children[id + 1].getAttributeNode('class').value = _this.map[x][y + 1] = 'miniBox role';
            element.children[id + 2].getAttributeNode('class').value = _this.map[x][y + 2] = 'miniBox box';
          } else if (_this.map[x][y + 2].includes('finial')) {  // 玩家下面不是终点，箱子前面是
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
            element.children[id + 1].getAttributeNode('class').value = _this.map[x][y + 1] = 'miniBox role';
            element.children[id + 2].getAttributeNode('class').value = _this.map[x][y + 2] = 'miniBox finial box';
          } else {  // 都不是
            element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
            element.children[id + 1].getAttributeNode('class').value = _this.map[x][y + 1] = 'miniBox role';
            element.children[id + 2].getAttributeNode('class').value = _this.map[x][y + 2] = 'miniBox box';
          }
        }
        PushBoxMap.rolePosition[0] = [x, y + 1];  // 更新角色位置
        return;
      } else if (_this.map[x][y + 1].includes('finial')) {  // 前面是终点
        if (_this.map[x][y].includes('finial')) {  // 自己是终点
          element.children[id + 1].getAttributeNode('class').value = _this.map[x][y + 1] = 'miniBox finial role'; // 更新map
          element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
        } else {
          element.children[id + 1].getAttributeNode('class').value = _this.map[x][y + 1] = 'miniBox finial role';
          element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
        }
        PushBoxMap.rolePosition[0] = [x, y + 1];  // 更新角色位置
        return;
      } else if (_this.map[x][y + 1].includes('floor')) {  // 前面是空地
        if (_this.map[x][y].includes('finial')) {  // 自己是终点
          element.children[id + 1].getAttributeNode('class').value = _this.map[x][y + 1] = 'miniBox role'; // 更新map
          element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox finial';
        } else {  // 自己不是终点
          element.children[id + 1].getAttributeNode('class').value = _this.map[x][y + 1] = 'miniBox role';
          element.children[id].getAttributeNode('class').value = _this.map[x][y] = 'miniBox floor';
        }
        PushBoxMap.rolePosition[0] = [x, y + 1];  // 更新角色位置
        return;
      }
    } else {
      return;
    }
  }

  // 规则约束
  loseOrWin() {
    let finialPosi = [];
    let boxPosi = [];
    // 赢的条件
    PushBoxMap.boxPosition.forEach((item, index) => {
      finialPosi[index] = '' + PushBoxMap.finialPosition[index][0] + PushBoxMap.finialPosition[index][1];
      boxPosi[index] = '' + PushBoxMap.boxPosition[index][0] + PushBoxMap.boxPosition[index][1];
    })
    const win = finialPosi.every((item) => {
      return boxPosi.includes(item);
    })
    if (win) {
      setTimeout(() => {
        alert('你赢了！！');
      }, 500)
    }
  }
}