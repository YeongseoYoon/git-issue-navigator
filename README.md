# Git Issue Navigator

## ❤️ 프로젝트 내용

- GitHub REST API를 활용해 특정 Repository에 대한 Issue를 볼 수 있는 서비스

## 🌱 배포 및 제작 기간

- 배포 링크 : [Git Issue Navigator](https://git-issue-navigator.vercel.app/)
- 제작 기간 : 2023.08.29. ~ 2023.08.30 (2일)

<img src="https://github.com/wanted-internship-12-9/boiler-plate/assets/86523545/d98b6b6e-b2ae-4350-99f9-0b88603b5a18"/>

## 개발 환경

### Developement

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Octokit-999999?style=for-the-badge&logo=`https://user-images.githubusercontent.com/139819/199528006-bc534966-4aee-45da-8d1e-0e71b97a56b3.png`&logoColor=gray"/>

### Styling

<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>

## 🚀 실행 방법

```
$ git clone https://github.com/YeongseoYoon/git-issue-navigator.git
$ npm install
$ npm start
```

## 📁 디렉토리 구조

```
📦src
 ┣ 📂apis
 ┃ ┗ 📜api.ts
 ┣ 📂assets
 ┃ ┣ 📜errorImage.png
 ┃ ┗ 📜spinner.gif
 ┣ 📂components
 ┃ ┣ 📂Issue
 ┃ ┃ ┣ 📜IssueDetail.tsx
 ┃ ┃ ┣ 📜IssueItem.tsx
 ┃ ┃ ┗ 📜IssueList.tsx
 ┃ ┣ 📜ErrorBoundary.tsx
 ┃ ┣ 📜Header.tsx
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜Layout.tsx
 ┃ ┣ 📜Loading.tsx
 ┃ ┗ 📜RouteErrorBoundary.tsx
 ┣ 📂constants
 ┃ ┗ 📜constants.ts
 ┣ 📂hooks
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜useBlockScroll.ts
 ┃ ┣ 📜useIntersectionObserver.ts
 ┃ ┣ 📜useOctokitDetailFetch.ts
 ┃ ┗ 📜useOctokitListFetch.ts
 ┣ 📂pages
 ┃ ┣ 📂detail
 ┃ ┃ ┗ 📜Detail.tsx
 ┃ ┣ 📂home
 ┃ ┃ ┗ 📜Home.tsx
 ┃ ┗ 📜index.ts
 ┣ 📂router
 ┃ ┗ 📜Router.tsx
 ┣ 📂types
 ┃ ┗ 📜issue.ts
 ┣ 📂utils
 ┃ ┣ 📜formatDateToKoreanDate.ts
 ┃ ┗ 📜index.ts
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┗ 📜index.tsx
```

## Assignment별 구현 방식

### Assignment 1. api 호출해 목록 / 상세 페이지 구현

- Github API 공식문서의 방식대로 octokit 라이브러리 이용해 api를 호출했습니다.
- useOctokitListFetch 와 useOctokitDetailFetch 커스텀훅을 이용해 데이터를 불러왔습니다.
- 페이지 컴포넌트와 IssueList 및 IssueItem 컴포넌트를 분리했습니다.

### Assignment 2. 에러바운더리(라우팅 및 비동기 에러제어)

- react-router-dom을 통한 글로벌 라우팅 RouteErrorBoundary를 적용했습니다.
- 각 페이지에서 발생하는 에러 관련해서 ErrorBoundary를 적용했습니다.

### Assignment 3. 로딩

- useOctokitListFetch 커스텀 훅에서 isLoading과 isInfiniteLoading을 구분해 반환하고 isLoading인 경우에는 페이지 전체를 감싸는 Loading 컴포넌트를, isInfiniteLoading 인 경우에는 무한스크롤 시 spinner gif를 렌더링했습니다.

<img src="https://github.com/wanted-internship-12-9/boiler-plate/assets/86523545/c392bb61-41c0-4687-be7c-fdda7df4c740"/>

```ts
//useOctokitListFetch 훅
const useOctokitListFetch = (
  url = `GET /repos/${ORGANIZATION_NAME}/${REPOSITORY_NAME}/issues?sort=comments&state=open`,
  routeParams: Record<string, string | number>,
) => {
  const [data, setData] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [page, setPage] = useState(1);

  const fetchOptions = {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
    ...routeParams,
  };

  const fetchList = useCallback((page: number) => {
    setIsInfiniteLoading(true);
    octokit
      .request(`${url}&page=${page}`, fetchOptions)
      .then(response => {
        setData(prev => [...prev, ...response.data]);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
        setIsInfiniteLoading(false);
      });
  }, []);

  const refetch = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    fetchList(page);
  }, [fetchList, page]);

  return { data, isLoading, isInfiniteLoading, error, refetch };
};
```

### Assignment 4. 무한 스크롤 구현

- IntersectionObserver API를 사용하여, isLoading 상태가 아니고 entries[0].isIntersecting 인 경우(즉, 뷰포트내에 관찰 요소가 보여진 경우) 리페칭해 데이터를 가져와 기존 데이터에 추가하도록 했습니다.

```ts
//useIntersectionObserver 훅
const useIntersectionObserver = ({ callback, isLoading }: UseIntersectionObserverProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observerElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && !isLoading) {
            callback();
          }
        },
        { rootMargin: '400px 0px' },
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [callback],
  );

  return { observerElementRef };
};

export default useIntersectionObserver;
```

### Assignment 5. 광고 이미지 호출

- IssueList 컴포넌트 내부에서 map으로 IssueItem을 렌더링 할 때 (index + 1) % 4 === 0 일 때 마다 광고 이미지가 보이도록 구현했습니다.
