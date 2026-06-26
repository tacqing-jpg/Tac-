"use client";

import { useState } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

interface ReadingAlbumProps {
  onBack: () => void;
}

interface Book {
  title: string;
  author: string;
  content: string[];
}

const BOOKS: Book[] = [
  {
    title: "博弈论",
    author: "约翰·纳什 等",
    content: [
      "博弈论（Game Theory）是研究理性决策者之间相互作用时如何进行决策的数学理论。它广泛应用于经济学、政治学、生物学和计算机科学等领域。",
      "博弈论的核心概念是「策略相互依赖」：每个参与者的最优决策取决于其他参与者的选择。这与单人决策问题有本质区别。",
      "—— 囚徒困境 ——",
      "囚徒困境是博弈论中最著名的模型。两个犯罪嫌疑人被分别关押审讯，从个体理性出发，无论对方怎么选，「坦白」总是对自己更有利——这就是「占优策略」。但结果却是两人都坦白、各判5年；而如果两人都不坦白，只需各判1年。个体理性导致了集体的非最优结果。",
      "—— 纳什均衡 ——",
      "纳什均衡由约翰·纳什于1950年提出：在一个策略组合中，如果没有任何参与者可以通过单方面改变自己的策略来获得更高的收益，那么这个策略组合就是一个纳什均衡。纳什在1994年因此获得诺贝尔经济学奖。",
      "—— 智猪博弈 ——",
      "猪圈里有一大一小两只猪，一端有食槽，另一端有按钮。博弈的结果是：小猪选择「等待」是占优策略，大猪只能自己去按——「大猪跑，小猪等」。这解释了为什么大企业更愿意投入研发而小企业倾向于模仿。",
      "—— 协调博弈 ——",
      "参与者需要做出一致的选择才能获得最优结果。最经典的例子是「靠左行驶还是靠右行驶」：重要的是大家选得一样。技术标准、互联网协议、文件格式的形成都可以用协调博弈来解释。",
    ],
  },
  {
    title: "百年孤独",
    author: "加西亚·马尔克斯",
    content: [
      "《百年孤独》是哥伦比亚作家加西亚·马尔克斯的代表作，被誉为魔幻现实主义文学的巅峰之作，1967年出版，1982年马尔克斯获诺贝尔文学奖。",
      "小说讲述了布恩迪亚家族七代人在虚构小镇马孔多的兴衰史。从何塞·阿尔卡蒂奥·布恩迪亚与表妹乌尔苏拉结婚开始，到家族最后一代被蚂蚁吞噬，时间跨越一百余年。",
      "—— 魔幻与现实 ——",
      "小说最震撼人心的地方在于将魔幻元素与日常现实无缝交融：美人雷梅黛丝乘床单升天、雨下了四年十一个月零两天、死人可以回到活人中间聊天……这些在马尔克斯笔下显得如此自然，因为这就是拉丁美洲的现实——一个任何事情都可能发生的大陆。",
      "—— 孤独的本质 ——",
      "书名中的「孤独」不是寂寞，而是一种存在的宿命。布恩迪亚家族的每一代人都在以不同方式对抗孤独——科学、爱情、战争、权力——但最终都失败了。这种孤独不是个体的偶然，而是人类共通的精神困境：我们始终无法真正理解彼此。",
      "—— 时间的循环 ——",
      "小说的时间不是线性的，而是循环的。家族名字不断重复（阿尔卡蒂奥、奥雷里亚诺），性格和命运也在代际间轮回。羊皮纸预言早在百年前就已写定，但直到最后一刻才被破解——命运的不可逃避令人震撼。",
    ],
  },
  {
    title: "1984",
    author: "乔治·奥威尔",
    content: [
      "《1984》是英国作家乔治·奥威尔于1949年出版的反乌托邦小说，与《美丽新世界》和《我们》并称为「反乌托邦三部曲」。",
      "故事设定在一个极端极权主义的社会「大洋国」，主人公温斯顿·史密斯在「真理部」工作，负责篡改历史记录以符合党的宣传。整个社会被「老大哥」监视，「思想警察」无处不在。",
      "—— 战争即和平，自由即奴役，无知即力量 ——",
      "奥威尔通过这些悖论式口号揭示了极权统治的逻辑：通过持续的战争维持国内团结；通过剥夺自由来实现绝对的服从；通过消灭独立思想来创造一个没有异议的社会。",
      "—— 新话 ——",
      "为了控制思想，党创造了「新话」——一种不断缩减词汇的语言。如果「自由」「反抗」这些词不存在，人们就没有语言工具来表达异议。奥威尔的洞察是：语言不仅是表达思想的工具，更是思想的边界。",
      "—— 为何仍被广泛阅读 ——",
      "《1984》不仅是对特定政权的批判，更是对权力本质的深刻剖析。对真相的篡改、对历史的改写、对个体的全面监控——这些主题在今天的信息时代比任何时代都更加切身。",
    ],
  },
  {
    title: "活着",
    author: "余华",
    content: [
      "《活着》是余华的代表作，1992年首次发表。小说以主人公福贵的一生为主线，讲述了一个普通人在中国近现代历史巨变中经历的苦难与坚韧。",
      "福贵原是地主家的少爷，因赌博败光家产后沦为佃农。其后数十年间，他经历了战争、土改、大跃进、文革等一系列历史事件，更遭遇了亲人接连离去的巨大悲痛——儿子有庆因献血过多而死，女儿凤霞难产而死，妻子家珍病逝，女婿二喜工伤身亡，最后连外孙苦根也因吃豆子撑死。",
      "—— 活着的意义就是活着本身 ——",
      "余华在小说的结尾写道：「人是为活着本身而活着的，而不是为了活着之外的任何事物所活着。」福贵最后与一头老牛相伴，他给牛取的名字也是「福贵」——这种平静不是麻木，而是历经一切之后对生命最朴素的接受。",
      "—— 苦难中的温情 ——",
      "尽管小说充满了死亡和苦难，但它不是一部绝望的书。福贵回忆往事时流露的温情、家珍对家庭的坚守、有庆的天真善良——这些瞬间构成了苦难缝隙中的人性光芒。",
    ],
  },
  {
    title: "小王子",
    author: "圣埃克苏佩里",
    content: [
      "《小王子》是法国作家安托万·德·圣埃克苏佩里于1943年出版的童话小说。虽然以童话形式写成，但其中蕴含的哲学思考使它成为跨越年龄的经典。",
      "故事以一位飞行员在撒哈拉沙漠坠机后遇到来自小行星B-612的小王子展开。小王子讲述了他离开自己的星球后，先后访问了六个小行星，遇到了国王、爱虚荣的人、酒鬼、商人、点灯人和地理学家——每个角色都象征着成人世界中的一种荒谬。",
      "—— 驯服与责任 ——",
      "小王子在地球上遇到了一只狐狸。狐狸教会他「驯服」的含义：「驯服就是建立联系。对我来说，你还只是一个小男孩，和其他千万个小男孩没什么两样。我不需要你，你也用不着我。但是，如果你驯服了我，我们就互相需要了。对我来说，你就是世界上唯一的了。」",
      "—— 用心去看 ——",
      "全书最重要的一句话是狐狸告诉小王子的秘密：「只有用心才能看清，本质的东西用眼睛是看不见的。」这既是对成人世界过度理性化的批判，也是对爱的本质的深刻揭示。",
      "—— 玫瑰 ——",
      "小王子离开星球前留下了一朵玫瑰。他以为这朵玫瑰是宇宙中独一无二的，直到他在地球上看到了五千朵一模一样的玫瑰。但正是因为他为这朵玫瑰付出了时间和爱，她才变得独一无二。这正是「驯服」所建立的独一无二的联系。",
    ],
  },
];

export function ReadingAlbum({ onBack }: ReadingAlbumProps) {
  const [selected, setSelected] = useState<Book | null>(null);

  if (selected) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelected(null)}
          className="inline-flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          返回书架
        </button>

        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            {selected.title}
          </h2>
          <p className="text-text-tertiary text-sm mt-1">{selected.author}</p>
        </div>

        <GlassCard hover={false}>
          <div className="space-y-4 leading-relaxed text-text-secondary text-sm">
            {selected.content.map((paragraph, i) =>
              paragraph.startsWith("——") ? (
                <h3
                  key={i}
                  className="text-base font-semibold text-text-primary pt-2"
                >
                  {paragraph.replace(/——\s*/g, "")}
                </h3>
              ) : (
                <p key={i}>{paragraph}</p>
              )
            )}
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回生活舱
      </button>

      <h2 className="text-2xl font-bold text-text-primary">📚 阅读</h2>
      <p className="text-text-tertiary text-sm">我的书架</p>

      <div className="space-y-3">
        {BOOKS.map((book, i) => (
          <button
            key={i}
            onClick={() => setSelected(book)}
            className="w-full text-left"
          >
            <GlassCard hover={true}>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-purple/10">
                  <BookOpen className="h-6 w-6 text-accent-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">
                    {book.title}
                  </h3>
                  <p className="text-xs text-text-tertiary mt-0.5">
                    {book.author}
                  </p>
                </div>
              </div>
            </GlassCard>
          </button>
        ))}
      </div>
    </div>
  );
}
